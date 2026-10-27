import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import type { Artwork } from "@/api/artic";
import { Editorial, Fonts } from "@/constants/editorial";
import { useAddFavorite, useFavoriteStatus, useRemoveFavorite } from "@/queries/useFavorites";

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

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const metaLine = [artwork.date, artwork.department]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  const { isFavorite, favorite } = useFavoriteStatus(artwork.id);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const toggleFavorite = () => {
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

  const goToDetail = () => {
    router.push({ pathname: "/artwork_detail", params: { id: artwork.id } } as any);
  };

  return (
    <Pressable onPress={goToDetail} style={styles.card} accessibilityRole="button">
      <View style={styles.frame}>
        <View style={styles.mat}>
          {artwork.imageUrl ? (
            <Image
              source={{ uri: artwork.imageUrl, headers: IMAGE_HEADERS }}
              style={styles.image}
              contentFit="cover"
              transition={220}
              priority={index !== undefined && index < 4 ? "high" : "normal"}
            />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            style={styles.heartButton}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            hitSlop={8}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={22} color={isFavorite ? "#b71c1c" : "#fff"} />
          </Pressable>
        </View>
      </View>

      <View style={styles.label}>
        <Text style={styles.title} numberOfLines={2}>
          {artwork.title}
        </Text>
        {artwork.artist ? (
          <Text style={[styles.artist, { fontFamily: Fonts.body }]} numberOfLines={1}>
            {artwork.artist}
          </Text>
        ) : null}
        {metaLine ? (
          <>
            <View style={styles.rule} />
            <Text style={[styles.meta, { fontFamily: Fonts.bodyStrong }]} numberOfLines={1}>
              {metaLine}
            </Text>
          </>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  frame: { aspectRatio: 0.75, backgroundColor: Editorial.paper, borderWidth: 1, borderColor: Editorial.rule, padding: 6 },
  mat: { flex: 1, overflow: "hidden", backgroundColor: Editorial.paperDeep },
  image: { width: "100%", height: "100%" },
  noImage: { alignItems: "center", justifyContent: "center" },
  noImageText: { color: Editorial.inkSoft, fontFamily: Fonts.body, fontSize: 11 },
  heartButton: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 16, padding: 4 },
  label: { marginTop: 10, gap: 4 },
  title: { color: Editorial.ink, fontFamily: Fonts.display, fontSize: 16, lineHeight: 20 },
  artist: { color: Editorial.inkSoft, fontSize: 12, lineHeight: 16 },
  rule: { backgroundColor: Editorial.rule, height: StyleSheet.hairlineWidth, marginTop: 2 },
  meta: { color: Editorial.brass, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase" },
});
