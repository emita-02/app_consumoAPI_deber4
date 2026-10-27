import { StyleSheet, Text, View } from 'react-native';
import { useIsMutating, onlineManager } from '@tanstack/react-query';
import { mutationKeys } from '@/queries/mutationKeys';
import { Editorial, Fonts } from '@/constants/editorial';

export function SyncIndicator() {
  const isOnline = onlineManager.isOnline();
  const createFavMutating = useIsMutating({ mutationKey: mutationKeys.createFavorite });
  const deleteFavMutating = useIsMutating({ mutationKey: mutationKeys.deleteFavorite });
  const createNoteMutating = useIsMutating({ mutationKey: mutationKeys.createNote });
  const updateNoteMutating = useIsMutating({ mutationKey: mutationKeys.updateNote });
  const anyMutatingCount = useIsMutating();

  const anyMutating =
    createFavMutating > 0 ||
    deleteFavMutating > 0 ||
    createNoteMutating > 0 ||
    updateNoteMutating > 0 ||
    anyMutatingCount > 0;

  if (!anyMutating && isOnline !== false) {
    return null;
  }

  if (!isOnline && anyMutating) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cambios pendientes de sincronización</Text>
      </View>
    );
  }

  if (anyMutating) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sincronizando cambios...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Editorial.brass,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.bodyStrong,
    fontSize: 12,
  },
});
