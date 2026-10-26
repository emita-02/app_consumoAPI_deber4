/**
 * Claves de mutación (mutationKey).
 *
 * Dos usos:
 *  1. `queryClient.setMutationDefaults(mutationKey, { mutationFn })` — registra la
 *     función que se ejecuta. Es OBLIGATORIO para que una mutación pausada que se
 *     restaura desde AsyncStorage pueda re-ejecutarse: al restaurar solo se guarda
 *     la clave y el estado, nunca la función (no es serializable).
 *  2. `useMutation({ mutationKey })` — permite contarlas/observarlas con
 *     `useIsMutating({ mutationKey })` y `useMutationState(...)`.
 *
 * Deben ser arrays estables y serializables (sin objetos ni funciones).
 */
export const mutationKeys = {
  /** POST /favorites — crear un favorito. */
  createFavorite: ['mine', 'favorite', 'create'] as const,
  /** DELETE /favorites/:id — quitar un favorito. */
  deleteFavorite: ['mine', 'favorite', 'delete'] as const,
  /** POST /notes — crear una nota. */
  createNote: ['mine', 'note', 'create'] as const,
  /** PATCH /notes/:id — editar una nota existente. */
  updateNote: ['mine', 'note', 'update'] as const,
};
