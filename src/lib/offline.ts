import type { QueryClient } from '@tanstack/react-query';

/**
 * Registra la `mutationFn` de cada mutación con `queryClient.setMutationDefaults`.
 *
 * POR QUÉ ES IMPRESCINDIBLE PARA EL MODO SIN CONEXIÓN
 * ---------------------------------------------------
 * Cuando no hay internet, TanStack Query pausa la mutación y solo persiste
 * `mutationKey` + `variables` + `estado` (la función no se puede serializar a JSON).
 * Al reabrir la app, `hydrate()` reconstruye la mutación con:
 *
 *     mutationCache.build(client, { mutationKey, ... }, estadoPausado)
 *
 * y `build()` aplica `client.defaultMutationOptions()`, que mezcla
 * `getMutationDefaults(mutationKey)`. Es decir: **la única forma de que una mutación
 * restaurada pueda ejecutarse al reanudarla es que su `mutationFn` esté registrada
 * aquí**; si no, `execute()` falla con "No mutationFn found".
 *
 * ORDEN (crítico)
 * ----------------
 * Esta función se llama desde `createQueryClient()` (src/queries/queryClient.ts),
 * es decir, ANTES de renderizar `<PersistQueryClientProvider>`. La restauración
 * ocurre en un efecto de ese proveedor, así que los defaults ya están registrados
 * cuando se hidrata la caché. Si se registraran después, la mutación restaurada
 * quedaría construida sin `mutationFn`.
 *
 * ETAPA 4 (MockAPI): aquí se registrará cada mutación, por ejemplo:
 *
 *     client.setMutationDefaults(mutationKeys.createFavorite, {
 *       mutationFn: createFavorite,   // POST /favorites
 *     });
 *
 * Las 4 claves ya están definidas en `src/queries/mutationKeys.ts`.
 */
export function registerMutationDefaults(_client: QueryClient): void {
  // Vacío a propósito en la etapa 1 (base + persistencia).
  // Se completa en la etapa 4, cuando existan las funciones contra MockAPI.
}
