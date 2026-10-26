import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArtworkCard } from '@/components/artwork-card';
import { Editorial, Fonts } from '@/constants/editorial';
import { useArtworks } from '@/queries/useArtworks';

/** Términos para sugerir cuando una búsqueda no devuelve nada. */
const SUGGESTIONS = ['Monet', 'Whistler', 'jarrón', 'impresionismo'];

export default function GalleryScreen() {
  const [text, setText] = useState('');
  const [term, setTerm] = useState('');

  // Retardo de 450 ms antes de buscar: sin él, cada tecla sería una petición
  // al museo y su límite son 60 por minuto por IP.
  useEffect(() => {
    const timer = setTimeout(() => setTerm(text), 450);
    return () => clearTimeout(timer);
  }, [text]);

  const gallery = useArtworks(term);
  const {
    items,
    q,
    isSearching,
    isLoading,
    isLoadingMore,
    isFetching,
    hasMore,
    loadMore,
    error,
    refetch,
  } = gallery;

  const clearSearch = () => {
    setText('');
    setTerm('');
  };

  const statusText = isSearching
    ? isFetching && !isLoadingMore
      ? `Buscando «${q}»…`
      : `«${q}» · ${items.length} ${items.length === 1 ? 'obra' : 'obras'}`
    : `Obras destacadas · ${items.length} en pantalla`;

  const footer = !items.length ? null : isLoadingMore ? (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color={Editorial.brass} />
      <Text style={styles.footerText}>Cargando más obras…</Text>
    </View>
  ) : error ? (
    <View style={styles.footer}>
      <Text style={styles.footerError}>No se pudieron cargar más obras.</Text>
      <Pressable onPress={() => refetch()} hitSlop={8}>
        <Text style={styles.footerAction}>Reintentar</Text>
      </Pressable>
    </View>
  ) : hasMore ? (
    <Pressable
      onPress={loadMore}
      style={styles.moreButton}
      accessibilityRole="button"
      accessibilityLabel="Ver más obras">
      <Text style={styles.moreText}>Ver más</Text>
    </Pressable>
  ) : (
    <View style={styles.endBlock}>
      <View style={styles.endRule} />
      <Text style={styles.endText}>Fin de la selección</Text>
      <View style={styles.endRule} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.brand}>Artelier</Text>
        <Text style={styles.kicker}>Colección digital · Art Institute of Chicago</Text>
        <View style={styles.headerRule} />

        <View style={styles.searchRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Buscar por título, artista o técnica"
            placeholderTextColor={Editorial.inkSoft}
            style={styles.search}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            selectionColor={Editorial.brass}
            accessibilityLabel="Buscar obras"
          />
          {text.length > 0 ? (
            <Pressable onPress={clearSearch} hitSlop={10} accessibilityLabel="Borrar búsqueda">
              <Text style={styles.clearText}>×</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.status} numberOfLines={1}>
          {statusText}
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => <ArtworkCard artwork={item} index={index} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          items.length === 0 && styles.listEmptyContent,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            isLoading={isLoading}
            error={error}
            isSearching={isSearching}
            q={q}
            onRetry={() => refetch()}
          />
        }
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
}

function EmptyState({
  isLoading,
  error,
  isSearching,
  q,
  onRetry,
}: {
  isLoading: boolean;
  error: Error | null;
  isSearching: boolean;
  q: string;
  onRetry: () => void;
}) {
  if (isLoading) {
    return (
      <View style={styles.stateBlock}>
        <ActivityIndicator size="small" color={Editorial.brass} />
        <Text style={styles.stateText}>Cargando la colección…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateBlock}>
        <Text style={styles.stateTitle}>No se pudo cargar la galería</Text>
        <Text style={styles.stateText}>{error.message}</Text>
        <Pressable onPress={onRetry} style={styles.retryButton} accessibilityRole="button">
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (isSearching) {
    return (
      <View style={styles.stateBlock}>
        <Text style={styles.stateTitle}>Sin resultados</Text>
        <Text style={styles.stateText}>No encontramos obras para «{q}».</Text>
        <Text style={styles.hint}>Prueba con: {SUGGESTIONS.join(' · ')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.stateBlock}>
      <Text style={styles.stateText}>La colección no está disponible ahora mismo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Editorial.paper,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Editorial.rule,
  },
  brand: {
    color: Editorial.ink,
    fontFamily: Fonts.displayBold,
    fontSize: 36,
    letterSpacing: -0.6,
  },
  kicker: {
    color: Editorial.brass,
    fontFamily: Fonts.bodyStrong,
    fontSize: 10,
    letterSpacing: 1.6,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  headerRule: {
    backgroundColor: Editorial.ink,
    height: 1,
    marginTop: 14,
    opacity: 0.9,
  },
  searchRow: {
    alignItems: 'center',
    borderBottomColor: Editorial.rule,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: 14,
    paddingBottom: 4,
  },
  search: {
    color: Editorial.ink,
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    paddingVertical: 6,
  },
  clearText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 24,
    lineHeight: 26,
    paddingHorizontal: 4,
  },
  status: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: 0.3,
    marginTop: 10,
  },
  listContent: {
    columnGap: 16,
    paddingBottom: 36,
    paddingHorizontal: 20,
    paddingTop: 18,
    rowGap: 26,
  },
  listEmptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  row: {
    columnGap: 16,
  },
  stateBlock: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
  },
  stateTitle: {
    color: Editorial.ink,
    fontFamily: Fonts.display,
    fontSize: 21,
    textAlign: 'center',
  },
  stateText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  hint: {
    color: Editorial.brass,
    fontFamily: Fonts.bodyStrong,
    fontSize: 11,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  retryButton: {
    borderColor: Editorial.ink,
    borderWidth: 1,
    marginTop: 4,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  retryText: {
    color: Editorial.ink,
    fontFamily: Fonts.bodyStrong,
    fontSize: 11,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 22,
  },
  footerText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 12,
  },
  footerError: {
    color: Editorial.danger,
    fontFamily: Fonts.body,
    fontSize: 12,
    textAlign: 'center',
  },
  footerAction: {
    color: Editorial.brass,
    fontFamily: Fonts.bodyStrong,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  moreButton: {
    alignItems: 'center',
    borderColor: Editorial.ink,
    borderWidth: 1,
    marginBottom: 6,
    marginTop: 4,
    paddingVertical: 15,
  },
  moreText: {
    color: Editorial.ink,
    fontFamily: Fonts.bodyStrong,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  endBlock: {
    alignItems: 'center',
    columnGap: 12,
    flexDirection: 'row',
    paddingVertical: 26,
  },
  endRule: {
    backgroundColor: Editorial.rule,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  endText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
