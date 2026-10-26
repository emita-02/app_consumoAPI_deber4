import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

import { registerMutationDefaults } from '@/lib/offline';

/**
 * ── Configuración de la caché ────────────────────────────────────────────────
 *
 * maxAge (persister): cuánto tiempo se RESTAURA desde AsyncStorage al abrir la app.
 * gcTime (QueryClient): cuánto tiempo vive en memoria una consulta inactiva.
 *
 * REGLA: gcTime >= maxAge. Si gcTime fuera menor (p. ej. 5 min vs 24 h), la app
 * restauraría una caché de hace 3 horas pero la borraría de memoria a los 5 minutos:
 * se perdería lo persistido y el objetivo de "pintar desde caché antes del GET"
 * se rompería con parpadeos. El detalle completo está en el README.
 */
export const PERSIST_MAX_AGE = 1000 * 60 * 60 * 24; // 24 h
export const CACHE_GC_TIME = PERSIST_MAX_AGE; // 24 h (siempre >= maxAge)

/** API pública (Art Institute of Chicago): datos estables, catálogo de museo. */
export const PUBLIC_STALE_TIME = 1000 * 60 * 10; // 10 minutos

/** MockAPI (favoritos y notas de la usuaria): datos propios, deben refrescar pronto. */
export const MOCKAPI_STALE_TIME = 1000 * 30; // 30 segundos

/** Clave de AsyncStorage donde se guarda la caché. Cambiarla descarta todo lo guardado. */
export const STORAGE_KEY = 'artapp-query-cache-v1';

/**
 * Cambia este valor si rompes el formato de los datos guardados: así la caché
 * vieja se descarta en lugar de restaurarse y fallar.
 */
const CACHE_BUSTER = 'v1';

/**
 * Persister: serializa (solo) la caché en AsyncStorage.
 *
 * `throttleTime: 300` acorta la ventana de riesgo del guardado: el persister guarda
 * como mucho una vez cada N ms, así que si cierras la app justo después de pausar
 * una mutación, 300 ms es mucho más seguro que el valor por defecto de 1000 ms.
 */
export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: STORAGE_KEY,
  throttleTime: 300,
});

/** Opciones de deshidratación: se guarda solo lo que interesa restaurar. */
export const dehydrateOptions = {
  /**
   * Solo se persisten las mutaciones PAUSADAS (las que esperan conexión).
   * Es también el comportamiento por defecto de TanStack Query, pero lo dejamos
   * explícito porque es el requisito central del trabajo: una mutación que quedó
   * "pendiente" debe sobrevivir al cierre total de la app.
   *
   * Las mutaciones ya terminadas no se guardan (no tienen nada que reanudar) y
   * las que estaban a mitad de vuelo con internet tampoco: re-ejecutarlas
   * podría duplicar registros en MockAPI.
   */
  shouldDehydrateMutation: (mutation: { state: { isPaused: boolean } }) =>
    mutation.state.isPaused,
};

/**
 * Crea el QueryClient de la app.
 *
 * IMPORTANTE: `registerMutationDefaults` se ejecuta AQUÍ, antes de que se monte
 * `<PersistQueryClientProvider>`. La restauración de la caché (y con ella la de
 * las mutaciones pausadas) ocurre en un efecto de ese proveedor, de modo que cuando
 * `hydrate()` construya cada mutación restaurada, su `mutationFn` ya estará
 * registrada y podrá re-ejecutarse al reanudarla.
 */
export function createQueryClient(): QueryClient {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        // Valor por defecto; las consultas de MockAPI lo bajan a MOCKAPI_STALE_TIME.
        staleTime: PUBLIC_STALE_TIME,
        gcTime: CACHE_GC_TIME,
        retry: 2,
      },
      mutations: {
        gcTime: CACHE_GC_TIME,
        // Dos reintentos por si la red cae entre que detectamos la conexión y pedimos.
        retry: 2,
        // Con offline no se intenta: la mutación queda pausada y se reanuda sola.
        networkMode: 'online',
      },
    },
  });

  registerMutationDefaults(client);

  return client;
}

/** Opciones que se pasan a `<PersistQueryClientProvider persistOptions={...}>`. */
export const persistOptions = {
  persister: queryPersister,
  maxAge: PERSIST_MAX_AGE,
  buster: CACHE_BUSTER,
  dehydrateOptions,
};
