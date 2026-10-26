/**
 * Jerarquía de claves de consulta (query keys).
 *
 * Regla de oro: cada clave es un array donde los primeros elementos agrupan y los
 * últimos identifican. Así, `invalidateQueries({ queryKey: queryKeys.mine.all })`
 * invalida TODOS los datos propios de golpe, y `queryKeys.mine.notes(id)` invalida
 * solo las notas de una obra concreta.
 *
 *   art  -> API pública del Art Institute of Chicago (solo lectura)
 *   mine -> Datos que crea la usuaria en MockAPI (favoritos y notas)
 */
export const queryKeys = {
  /** Rama de la API pública. */
  art: {
    /** ['art'] — invalida toda la rama pública (nunca se hace: el museo no cambia). */
    all: ['art'] as const,
    /** ['art','list',page,q] — una página de la galería / una búsqueda. */
    list: (params: { page: number; q?: string }) =>
      ['art', 'list', params.page, params.q ?? ''] as const,
    /** ['art','detail',id] — una obra concreta. */
    detail: (id: string) => ['art', 'detail', id] as const,
  },

  /** Rama de los datos propios (MockAPI). */
  mine: {
    /** ['mine'] — invalida favoritos Y notas a la vez. */
    all: ['mine'] as const,
    /** ['mine','favorites'] — la lista de favoritos. */
    favorites: () => ['mine', 'favorites'] as const,
    /** ['mine','favorites',artworkId] — si una obra concreta es favorita. */
    favorite: (artworkId: string) => ['mine', 'favorites', artworkId] as const,
    /** ['mine','notes',artworkId] — todas las notas de una obra. */
    notes: (artworkId: string) => ['mine', 'notes', artworkId] as const,
    /** ['mine','notes',artworkId,noteId] — una nota concreta. */
    note: (artworkId: string, noteId: string) =>
      ['mine', 'notes', artworkId, noteId] as const,
  },
} as const;

/** Tipo de las claves, para poder tipar los datos que devuelven los hooks. */
export type QueryKeys = typeof queryKeys;
