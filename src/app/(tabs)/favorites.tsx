import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";

import { Editorial, Fonts } from "@/constants/editorial";
import { useFavorites, useRemoveFavorite } from "@/queries/useFavorites";
import { buildImageUrl } from "@/api/artic";
import { Platform } from "react-native";

const IMAGE_HEADERS =
  Platform.OS === "web"
    ? undefined
    : {
        Referer: "https://www.artic.edu/",
        "User-Agent": "okhttp/4.12.0",
      };

export default function FavoritesScreen() {
  const { favorites, isLoading, error, refetch } = useFavorites();
  const removeFavorite = useRemoveFavorite();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.brand}>Favoritos</Text>
        <Text style={[styles.kicker, { fontFamily: Fonts.bodyStrong }]}>Obras guardadas</Text>
        <View style={styles.headerRule} />
      </View>

      {isLoading && favorites.length === 0 ? (
        <View style={styles.stateBlock}>
          <ActivityIndicator size="small" color={Editorial.brass} />
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>Cargando favoritos...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No se pudieron cargar los favoritos</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>{error.message}</Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={[styles.retryText, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
          </Pressable>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No hay favoritos</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>
            Guarda obras desde el catálogo para verlas aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const imageUrl = item.imageId ? buildImageUrl(undefined, item.imageId, 400) : null;
            return (
              <Pressable
                onPress={() => router.push({ pathname: "/artwork_detail", params: { id: item.artworkId } } as any)}
                style={styles.card}
                accessibilityRole="button">
                <View style={styles.imageFrame}>
                  <View style={styles.imageMat}>
                    {imageUrl ? (
                      <Image source={{ uri: imageUrl, headers: IMAGE_HEADERS }} style={styles.image} contentFit="cover" />
                    ) : (
                      <View style={[styles.image, styles.noImage]}>
                        <Text style={styles.noImageText}>Sin imagen</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  {item.artist ? (
                    <Text style={[styles.artist, { fontFamily: Fonts.body }]} numberOfLines={1}>
                      {item.artist}
                    </Text>
                  ) : null}
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      removeFavorite.mutate(item.id);
                    }}
                    disabled={removeFavorite.isPending}
                    style={styles.removeButton}
                    accessibilityRole="button"
                    accessibilityLabel="Quitar de favoritos">
                    <Text style={[styles.removeText, { fontFamily: Fonts.bodyStrong }]}>Quitar de favoritos</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Editorial.paper },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Editorial.rule },
  brand: { color: Editorial.ink, fontFamily: Fonts.displayBold, fontSize: 36, letterSpacing: -0.6 },
  kicker: { color: Editorial.brass, fontSize: 10, letterSpacing: 1.6, marginTop: 4, textTransform: "uppercase" },
  headerRule: { backgroundColor: Editorial.ink, height: 1, marginTop: 14, opacity: 0.9 },
  listContent: { paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  card: { flexDirection: "row", gap: 12, borderWidth: 1, borderColor: Editorial.rule, padding: 10, backgroundColor: Editorial.paper },
  imageFrame: { width: 90, aspectRatio: 0.75, backgroundColor: Editorial.paper, borderWidth: 1, borderColor: Editorial.rule, padding: 3 },
  imageMat: { flex: 1, overflow: "hidden", backgroundColor: Editorial.paperDeep },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 9 },
  cardContent: { flex: 1, justifyContent: "center", gap: 4 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 15, lineHeight: 18 },
  artist: { color: Editorial.inkSoft, fontSize: 12, lineHeight: 16 },
  removeButton: { marginTop: 6, alignSelf: "flex-start" },
  removeText: { color: Editorial.brass, fontSize: 11 },
  stateBlock: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 10 },
  stateTitle: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 18 },
  stateText: { color: Editorial.inkSoft, fontSize: 14, textAlign: "center" },
  retryButton: { marginTop: 8, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Editorial.rule },
  retryText: { color: Editorial.ink, fontSize: 12 },
});
