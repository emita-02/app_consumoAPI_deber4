import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { useArtwork } from "@/queries/useArtworks";
import { Editorial, Fonts } from "@/constants/editorial";
import { useAddFavorite, useFavoriteStatus, useRemoveFavorite } from "@/queries/useFavorites";
import { Platform } from "react-native";

const IMAGE_HEADERS =
  Platform.OS === "web"
    ? undefined
    : {
        Referer: "https://www.artic.edu/",
        "User-Agent": "okhttp/4.12.0",
      };

function extractImageId(imageUrl: string | null): string | null {
  if (!imageUrl) return null;
  try {
    const match = imageUrl.match(/\/([a-f0-9-]+)\/full\//i);
    if (match && match[1]) return match[1];
    const parts = imageUrl.split("/");
    const idx = parts.findIndex((p) => p === "iiif" || p === "2");
    if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  } catch {}
  return null;
}

export default function ArtworkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artworkId = id || "";
  const { artwork, isLoading, error, refetch } = useArtwork(artworkId);
  const { isFavorite, favorite } = useFavoriteStatus(artworkId);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const toggleFavorite = () => {
    if (!artwork) return;
    if (isFavorite && favorite?.id) {
      removeFavorite.mutate(favorite.id);
      return;
    }
    if (addFavorite.isPending) return;
    const imageId = extractImageId(artwork.imageUrl);
    addFavorite.mutate({
      artworkId: artwork.id,
      title: artwork.title,
      artist: artwork.artist,
      imageId: imageId,
    } as any);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityRole="button">
          <Text style={[styles.backText, { fontFamily: Fonts.bodyStrong }]}>? Volver</Text>
        </Pressable>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>Detalle</Text>
          <Pressable onPress={toggleFavorite} style={styles.heartDetail} accessibilityRole="button">
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={26} color={isFavorite ? "#b71c1c" : Editorial.ink} />
          </Pressable>
        </View>
        <View style={styles.headerRule} />
      </View>

      {isLoading ? (
        <View style={styles.stateBlock}>
          <ActivityIndicator size="small" color={Editorial.brass} />
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>Cargando obra...</Text>
        </View>
      ) : error ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>No se pudo cargar la obra</Text>
          <Text style={[styles.stateText, { fontFamily: Fonts.body }]}>{error.message}</Text>
          <Pressable onPress={() => refetch()} style={styles.retryButton}>
            <Text style={[styles.retryText, { fontFamily: Fonts.bodyStrong }]}>Reintentar</Text>
          </Pressable>
        </View>
      ) : !artwork ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateTitle}>Obra no disponible</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.imageFrame}>
            {artwork.imageUrl ? (
              <Image source={{ uri: artwork.imageUrl, headers: IMAGE_HEADERS }} style={styles.image} contentFit="contain" />
            ) : (
              <View style={[styles.image, styles.noImage]}>
                <Text style={styles.noImageText}>Sin imagen</Text>
              </View>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{artwork.title}</Text>
            {artwork.artist ? <Text style={[styles.artist, { fontFamily: Fonts.body }]}>{artwork.artist}</Text> : null}
            {artwork.date ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Fecha: {artwork.date}</Text> : null}
            {artwork.medium ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Técnica/medio: {artwork.medium}</Text> : null}
            {artwork.department ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Departamento: {artwork.department}</Text> : null}
            {artwork.placeOfOrigin ? <Text style={[styles.meta, { fontFamily: Fonts.body }]}>Origen: {artwork.placeOfOrigin}</Text> : null}
            {artwork.creditLine ? <Text style={[styles.credit, { fontFamily: Fonts.body }]}>{artwork.creditLine}</Text> : null}
            {artwork.description ? <Text style={[styles.description, { fontFamily: Fonts.body }]}>{artwork.description}</Text> : null}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Editorial.paper },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 14 },
  backButton: { alignSelf: "flex-start", marginBottom: 6 },
  backText: { color: Editorial.brass, fontSize: 12 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { color: Editorial.ink, fontFamily: Fonts.displayBold, fontSize: 32, letterSpacing: -0.6 },
  heartDetail: { padding: 4 },
  headerRule: { backgroundColor: Editorial.ink, height: 1, marginTop: 10, opacity: 0.9 },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  imageFrame: { width: "100%", aspectRatio: 0.8, borderWidth: 1, borderColor: Editorial.rule, padding: 8, backgroundColor: Editorial.paper, marginTop: 12 },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 12 },
  info: { marginTop: 16, gap: 6 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 24, lineHeight: 28 },
  artist: { color: Editorial.inkSoft, fontSize: 14 },
  meta: { color: Editorial.ink, fontSize: 13 },
  credit: { color: Editorial.inkSoft, fontSize: 12, marginTop: 4 },
  description: { color: Editorial.ink, fontSize: 13, lineHeight: 20, marginTop: 6 },
  stateBlock: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20, gap: 10 },
  stateTitle: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 18 },
  stateText: { color: Editorial.inkSoft, fontSize: 14, textAlign: "center" },
  retryButton: { marginTop: 8, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Editorial.rule },
  retryText: { color: Editorial.ink, fontSize: 12 },
});
