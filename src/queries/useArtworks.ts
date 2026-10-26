import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
 * Por qué NO `useInfiniteQuery`: cada página vive en su propia clave
 * (`art.list(page, q)`), así que al volver atrás o repetir una búsqueda las
 * páginas anteriores salen de la caché sin pedirlas de nuevo, y el código
 * se entiende con `useQuery` + un estado local que acumula resultados.
 *
 * Orden de los efectos:
 *  1. Al cambiar la búsqueda → página 1 y lista vacía.
 *  2. Cuando la página actual resuelve → se añaden sus obras (sin duplicar).
 */
export function useArtworks(input: string) {
  const q = normalizeSearch(input);

  // `q` y `page` se guardan JUNTAS: si van en estados separados, al cambiar la
  // búsqueda la siguiente renderación usaría la página vieja con el texto nuevo
  // y dispararía una petición inútil (el museo admite 60 por minuto).
  const [params, setParams] = useState({ q: '', page: 1 });
  const [items, setItems] = useState<Artwork[]>([]);

  // Cambiar de búsqueda empieza una galería nueva.
  useEffect(() => {
    setParams((previous) => (previous.q === q ? previous : { q, page: 1 }));
    setItems([]);
  }, [q]);

  const { q: search, page } = params;

  // `params` llega un render tarde respecto al texto que ha escrito la usuaria:
  // mientras no coincidan, la clave de la consulta todavía es la de la búsqueda
  // anterior y no debemos mezclar sus resultados con los nuevos.
  const inSync = search === q;

  const query = useQuery({
    queryKey: queryKeys.art.list({ page, q: search }),
    queryFn: () => fetchArtworks({ page, q: search }),
    staleTime: PUBLIC_STALE_TIME,
  });

  // Acumula la página actual. Si la caché devuelve la misma página otra vez,
  // `mergeArtworks` evita repetir obras.
  const pageData = query.data;
  useEffect(() => {
    if (!pageData || !inSync) return;
    setItems((previous) => mergeArtworks(previous, pageData.items));
  }, [pageData, inSync]);

  const isSearching = q.length > 0;

  return {
    /** Obras acumuladas de todas las páginas visibles. */
    items,
    /** Normaliza y expone el término ya limpio. */
    q,
    isSearching,
    /** Primera carga (no hay NADA que mostrar todavía). */
    isLoading: items.length === 0 && (query.isPending || query.isFetching),
    /** Estamos trayendo una página más con «Ver más». */
    isLoadingMore: page > 1 && query.isFetching,
    hasMore: pageData?.hasMore ?? true,
    loadMore: () => {
      if (query.isFetching) return;
      setParams((current) => ({ ...current, page: current.page + 1 }));
    },
    /** `true` mientras hay una petición en marcha (para el pie de lista). */
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
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
