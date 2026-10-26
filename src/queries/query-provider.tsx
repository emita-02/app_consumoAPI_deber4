import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { PropsWithChildren } from 'react';

import { startNetworkWatcher } from '@/lib/network';
import { createQueryClient, persistOptions } from './queryClient';

/**
 * 1) El watcher de red se instala ANTES de montar el proveedor, para que cuando
 *    el proveedor termine de restaurar la caché y llame a `resumePausedMutations()`,
 *    `onlineManager` ya refleje si hay internet real.
 * 2) Los defaults de mutación (mutationFn) se registran dentro de `createQueryClient()`,
 *    también antes de la restauración.
 * 3) El resto lo hace el proveedor: hidratar desde AsyncStorage, suscribirse a los
 *    cambios y reanudar lo que quedó pausado.
 */
startNetworkWatcher();

const queryClient = createQueryClient();

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
      // Se ejecuta cuando termina de restaurar la caché persistida: ese es el
      // momento exacto de reanudar las mutaciones que quedaron pausadas sin conexión.
      onSuccess={() => queryClient.resumePausedMutations()}
      onError={() => {
        // Si la caché guardada no se puede leer, TanStack la descarta y seguimos
        // desde cero: nunca debe impedir arrancar la app.
        if (__DEV__) console.warn('[persist] No se pudo restaurar la caché; se descarta.');
      }}>
      {children}
    </PersistQueryClientProvider>
  );
}

/** El QueryClient único de la app (útil para inspecciones en desarrollo). */
export { queryClient };
