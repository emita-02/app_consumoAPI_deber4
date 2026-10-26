import * as Network from 'expo-network';
import { onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';

/**
 * Conecta el `onlineManager` de TanStack Query con el estado real de la red.
 *
 * Por defecto TanStack solo escucha los eventos `online`/`offline` de `window`, que no
 * existen en React Native, así que sin este módulo la app siempre creería que tiene
 * internet: las mutaciones se ejecutarían (y fallarían) en lugar de pausarse.
 *
 * "Estar conectado a una red" no es lo mismo que "tener internet":
 *  - `isConnected` solo dice que hay una interfaz activa (p. ej. un Wi-Fi sin salida).
 *  - `isInternetReachable` (Android) confirma que la conexión fue validada por el SO.
 *
 * Regla: solo marcamos OFFLINE cuando tenemos pruebas de que no hay internet; si el
 * estado es desconocido preferimos quedarnos en online y dejar que los reintentos hagan
 * su trabajo (nos quedarnos "offline" por error dejaría las consultas paradas para siempre).
 */
const RECHECK_WHILE_OFFLINE_MS = 15_000;

/**
 * Decide si hay internet real a partir del estado de red del dispositivo.
 * @param state estado devuelto por `expo-network`
 * @returns `true` solo si no tenemos constancia de la ausencia de internet
 */
export function isReallyOnline(state: Network.NetworkState): boolean {
  // Sin interfaz de red (modo avión, Wi-Fi y datos apagados).
  if (state.isConnected === false) return false;
  if (state.type === Network.NetworkStateType.NONE) return false;
  // Conectado a una red pero el sistema todavía no valida que haya salida a internet.
  if (state.isInternetReachable === false) return false;
  // Desconocido -> asumimos online.
  return true;
}

/**
 * Instala el listener de red. Idempotente: `onlineManager.setEventListener` reemplaza
 * el listener anterior (y ejecuta su limpieza), así que puede llamarse otra vez si el
 * módulo se recarga con Fast Refresh.
 *
 * Se llama ANTES de montar `PersistQueryClientProvider` para que, cuando el proveedor
 * termine de restaurar la caché y ejecute `resumePausedMutations()`, `onlineManager`
 * ya sepa si realmente hay internet.
 */
export function startNetworkWatcher(): void {
  // En el render estático de web (SSR en Node) no hay `window`, no hay red que
  // observar y `addNetworkStateListener` lanzaría "window is not defined".
  // Ahí no hace falta: las consultas y mutaciones solo existen en el dispositivo.
  if (typeof window === 'undefined') return;

  onlineManager.setEventListener((setOnline) => {
    let recheckTimer: ReturnType<typeof setInterval> | undefined;

    const apply = (state: Network.NetworkState) => {
      const online = isReallyOnline(state);
      onlineManager.setOnline(online);
      setOnline(online);

      // Si no hay internet, el sistema operativo no siempre avisa de la vuelta
      // (sobre todo al salir del modo avión), así que reintentamos periódicamente.
      if (!online && recheckTimer === undefined) {
        recheckTimer = setInterval(refresh, RECHECK_WHILE_OFFLINE_MS);
      } else if (online && recheckTimer !== undefined) {
        clearInterval(recheckTimer);
        recheckTimer = undefined;
      }
    };

    const refresh = () => {
      Network.getNetworkStateAsync().then(apply).catch(() => {});
    };

    // Estado inicial + cambios de red (Wi-Fi <-> datos <-> modo avión).
    refresh();
    const subscription = Network.addNetworkStateListener(apply);

    // Al volver a primer plano volvemos a comprobar: es el momento en el que más
    // cambia la conectividad y en el que más se reanudan mutaciones pausadas.
    const appStateSubscription = AppState.addEventListener('change', (status) => {
      if (status === 'active') refresh();
    });

    return () => {
      if (recheckTimer !== undefined) clearInterval(recheckTimer);
      subscription.remove();
      appStateSubscription.remove();
    };
  });
}
