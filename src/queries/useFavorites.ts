import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createFavorite, deleteFavorite, fetchFavorites, type Favorite } from '@/api/mock';
import { MOCKAPI_STALE_TIME } from './queryClient';
import { mutationKeys } from './mutationKeys';
import { queryKeys } from './queryKeys';

export function useFavorites() {
  const query = useQuery({
    queryKey: queryKeys.mine.favorites(),
    queryFn: fetchFavorites,
    staleTime: MOCKAPI_STALE_TIME,
  });

  return {
    favorites: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useFavoriteStatus(artworkId: string) {
  const { favorites } = useFavorites();
  const favorite = favorites.find((f) => f.artworkId === artworkId) || null;
  return {
    isFavorite: !!favorite,
    favorite,
  };
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.createFavorite,
    mutationFn: (input: Omit<Favorite, 'id' | 'addedAt'> & { addedAt?: string }) =>
      createFavorite(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.favorites() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.all });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: mutationKeys.deleteFavorite,
    mutationFn: (id: string) => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.favorites() });
      queryClient.invalidateQueries({ queryKey: queryKeys.mine.all });
    },
  });
}
