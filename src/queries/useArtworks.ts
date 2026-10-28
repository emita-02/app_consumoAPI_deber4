import { useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import {
  fetchArtwork,
  fetchArtworks,
  type Artwork,
  type ArtworkDetail,
} from '@/api/artic';
import { PUBLIC_STALE_TIME } from './queryClient';
import { queryKeys } from './queryKeys';

/**
 * Normaliza el texto de búsqueda para que "monet  " y " Monet" sean la MISMA
 * clave de caché (si no, cada espacio en blanco sería una petición distinta).
 */
export function normalizeSearch(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

/** Fusiona dos listas quitando obras repetidas por id. */
function mergeArtworks(previous: Artwork[], incoming: Artwork[]): Artwork[] {
  const seen = new Set(previous.map((item) => item.id));
  const merged = [...previous];
  for (const item of incoming) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  }
  return merged;
}

/**
 * Galería: catálogo completo o búsqueda, con paginación por botón «Ver más».
 *
 * Diseño (sin `useEffect` ni lista acumulada en estado):
 *  - El ÚNICO estado local es hasta qué página llega la búsqueda actual.
 *  - Se piden las páginas 1..N de la búsqueda actual con `useQueries`, cada una
 *    en su propia clave `art.list(page, q)`.
 *  - `items` se DERIVA de lo que haya en caché en ese momento.
 *
 * Así, al borrar la búsqueda la clave `art.list(1, '')` ya está en caché y las
 * obras de inicio aparecen en el mismo render, sin depender de que ningún
 * efecto vuelva a rellenar una lista que otro efecto acaba de vaciar.
 */
export function useArtworks(input: string) {
  const q = normalizeSearch(input);

  // `page` pertenece a una búsqueda concreta. Si `q` cambia, el valor guardado
  // ya no coincide y la página vuelve a 1 automáticamente (sin efectos).
  const [pageState, setPageState] = useState({ q: '', page: 1 });
  const page = pageState.q === q ? pageState.page : 1;

  const results = useQueries({
    queries: Array.from({ length: page }, (_, index) => ({
      queryKey: queryKeys.art.list({ page: index + 1, q }),
      queryFn: () => fetchArtworks({ page: index + 1, q }),
      staleTime: (query) =>
        query.state.data && query.state.data.items.length > 0
          ? PUBLIC_STALE_TIME
          : 0,
    })),
  });

  // Obras acumuladas de las páginas 1..N, en orden y sin repetir.
  let items: Artwork[] = [];
  for (const result of results) {
    if (result.data) items = mergeArtworks(items, result.data.items);
  }

  const first = results[0];
  const last = results[results.length - 1];
  const failed = results.find((result) => result.error);

  const isSearching = q.length > 0;

  return {
    /** Obras acumuladas de todas las páginas visibles. */
    items,
    /** Normaliza y expone el término ya limpio. */
    q,
    isSearching,
    /** Primera carga (no hay NADA que mostrar todavía). */
    isLoading: items.length === 0 && (first.isPending || first.isFetching),
    /** Estamos trayendo una página más con «Ver más». */
    isLoadingMore: page > 1 && last.isFetching,
    hasMore: last.data?.hasMore ?? true,
    loadMore: () => {
      if (last.isFetching) return;
      setPageState({ q, page: page + 1 });
    },
    /** `true` mientras hay una petición en marcha (para el pie de lista). */
    isFetching: results.some((result) => result.isFetching),
    error: (failed?.error ?? null) as Error | null,
    refetch: () => (failed ?? last).refetch(),
  };
}

/**
 * Detalle de una obra por id (la usará la pantalla de detalle en la etapa 3).
 * Mantiene `staleTime` público: la ficha de una obra casi nunca cambia.
 */
export function useArtwork(id: string) {
  const query = useQuery({
    queryKey: queryKeys.art.detail(id),
    queryFn: () => fetchArtwork(id),
    enabled: id.length > 0,
    staleTime: PUBLIC_STALE_TIME,
  });

  return {
    artwork: (query.data ?? null) as ArtworkDetail | null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}