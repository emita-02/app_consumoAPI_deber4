import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

import type { Artwork } from '@/api/artic';
import { Editorial, Fonts } from '@/constants/editorial';

/**
 * Cabeceras que la tarjeta añade a cada imagen (solo nativo).
 *
 * El CDN de imágenes de ArtIC (`www.artic.edu`, Cloudflare) devuelve **403** a:
 *  - peticiones sin cabecera `Referer` — en web la añade el navegador, en nativo no;
 *  - peticiones con la UA por defecto de Android (`Dalvik/2.1.0 …`), que trata como bot.
 *
 * Por eso declaramos `Referer` y sobrescribimos `User-Agent` con la misma UA que usa
 * el `fetch` de React Native (`okhttp/…`), que el CDN sí acepta.
 *
 * Solo en nativo: en web una cabecera personal dispara un preflight `OPTIONS`
 * que el CDN no atendería y las imágenes dejarían de cargar.
 */
const IMAGE_HEADERS =
  Platform.OS === 'web'
    ? undefined
    : {
        Referer: 'https://www.artic.edu/',
        'User-Agent': 'okhttp/4.12.0',
      };

interface ArtworkCardProps {
  artwork: Artwork;
  /** Posición en la lista: las 4 primeras cargan con prioridad. */
  index?: number;
}

/**
 * Ficha de galería: obra enmarcada (como un passe-partout) y debajo la cartela
 * de museo —título en serif, artista y una línea de datos en versalitas.
 */
export function ArtworkCard({ artwork, index }: ArtworkCardProps) {
  const metaLine = [artwork.date, artwork.department]
    .filter((value): value is string => Boolean(value))
    .join(' · ');

  return (
    <View style={styles.card}>
      <View style={styles.frame}>
        <View style={styles.mat}>
          {artwork.imageUrl ? (
            <Image
              source={{ uri: artwork.imageUrl, headers: IMAGE_HEADERS }}
              style={styles.image}
              contentFit="cover"
              transition={220}
              priority={index !== undefined && index < 4 ? 'high' : 'normal'}
            />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.label}>
        <Text style={styles.title} numberOfLines={2}>
          {artwork.title}
        </Text>
        {artwork.artist ? (
          <Text style={styles.artist} numberOfLines={1}>
            {artwork.artist}
          </Text>
        ) : null}
        {metaLine ? (
          <>
            <View style={styles.rule} />
            <Text style={styles.meta} numberOfLines={1}>
              {metaLine}
            </Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  frame: {
    aspectRatio: 0.75,
    backgroundColor: Editorial.paper,
    borderWidth: 1,
    borderColor: Editorial.rule,
    padding: 6,
  },
  mat: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Editorial.paperDeep,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 11,
  },
  label: {
    marginTop: 10,
    gap: 4,
  },
  title: {
    color: Editorial.ink,
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 20,
  },
  artist: {
    color: Editorial.inkSoft,
    fontFamily: Fonts.body,
    fontSize: 12,
    lineHeight: 16,
  },
  rule: {
    backgroundColor: Editorial.rule,
    height: StyleSheet.hairlineWidth,
    marginTop: 2,
  },
  meta: {
    color: Editorial.brass,
    fontFamily: Fonts.bodyStrong,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
