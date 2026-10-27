import type { QueryClient } from '@tanstack/react-query';

import { mutationKeys } from '@/queries/mutationKeys';
import { createFavorite, deleteFavorite, createNote, updateNote } from '@/api/mock';

/**
 * Registra la `mutationFn` de cada mutación con `queryClient.setMutationDefaults`.
 *
 * Es OBLIGATORIO para que una mutación pausada que se restaura desde AsyncStorage
 * pueda re-ejecutarse: al restaurar solo se guarda la clave y el estado, nunca
 * la función (no es serializable).
 */
export function registerMutationDefaults(client: QueryClient): void {
  client.setMutationDefaults(mutationKeys.createFavorite, {
    mutationFn: (variables: any) => createFavorite(variables),
  });

  client.setMutationDefaults(mutationKeys.deleteFavorite, {
    mutationFn: (variables: any) => deleteFavorite(variables),
  });

  client.setMutationDefaults(mutationKeys.createNote, {
    mutationFn: (variables: any) => createNote(variables),
  });

  client.setMutationDefaults(mutationKeys.updateNote, {
    mutationFn: (variables: any) => {
      const { id, ...rest } = variables || {};
      return updateNote(id, rest);
    },
  });
}
