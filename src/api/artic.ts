import { ARTIC_API_BASE } from './config';

/**
 * Cliente de la API pública del Art Institute of Chicago (solo lectura).
 *
 * Datos comprobados contra la documentación oficial (https://api.artic.edu/docs):
 *  - `GET /artworks`                -> listado paginado: `page`, `limit`, `fields`.
 *                                       NO acepta `q` (si lo pones, lo ignora).
 *  - `GET /artworks/search?q=...`   -> búsqueda full-text: mismos `page`/`limit`
 *                                       y devuelve también `image_id` si lo pides.
 *  - `GET /artworks/{id}`           -> detalle de una obra.
 *  - Las imágenes NO vienen en la API: se construyen con `config.iiif_url` + `image_id`.
 *
 * El museo limita a 60 peticiones/minuto por IP, por eso pedimos solo los campos
 * que usamos y cacheamos con `staleTime` (10 minutos).
 */

/** Campos que necesita la galería (peticiones ligeras). */
const LIST_FIELDS = [
  'id',
  'title',
  'image_id',
  'artist_display',
  'date_display',
  'medium_display',
  'department_title',
  'is_public_domain',
].join(',');

/** Campos extra que solo se piden en el detalle. */
const DETAIL_FIELDS = [
  ...LIST_FIELDS.split(','),
  'description',
  'place_of_origin',
  'credit_line',
  'classification_title',
  'api_link',
].join(',');

/** Obras por página (el propio museo usa 12 por defecto). */
export const ARTWORKS_PAGE_SIZE = 12;

/** Tamaños recomendados por el museo: no inventes anchos, usan su caché. */
export const IMAGE_WIDTH_CARD = 400;
export const IMAGE_WIDTH_DETAIL = 843;

/** Respaldo por si alguna respuesta no trae `config.iiif_url`. */
const IIIF_FALLBACK = 'https://www.artic.edu/iiif/2';

/** Límite de la API de búsqueda: no se pueden pedir más de 10.000 registros. */
const SEARCH_MAX_RECORDS = 10_000;

/** Error propio de esta capa, con un mensaje listo para mostrar en pantalla. */
export class ArtApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ArtApiError';
    this.status = status;
  }
}

/** Obra en formato de la app (ya con la URL de la imagen resuelta). */
export interface Artwork {
  /** Siempre string: sirve de key de lista y para las rutas de navegación. */
  id: string;
  title: string;
  /** Solo el primer nombre del `artist_display` (la API trae varias líneas). */
  artist: string | null;
  artistDisplay: string | null;
  date: string | null;
  medium: string | null;
  department: string | null;
  isPublicDomain: boolean;
  /** URL IIIF completa, o `null` si la obra no tiene imagen publicada. */
  imageUrl: string | null;
}

export interface ArtworkDetail extends Artwork {
  /** Texto plano: la API devuelve HTML en `description`. */
  description: string | null;
  placeOfOrigin: string | null;
  creditLine: string | null;
  classification: string | null;
  apiLink: string | null;
}

export interface ArtworkPage {
  items: Artwork[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

/** Respuesta cruda de la API. */
interface RawArtwork {
  id: number;
  title: string | null;
  image_id: string | null;
  artist_display: string | null;
  date_display: string | null;
  medium_display: string | null;
  department_title: string | null;
  is_public_domain?: boolean | null;
  description?: string | null;
  place_of_origin?: string | null;
  credit_line?: string | null;
  classification_title?: string | null;
  api_link?: string | null;
}

interface ArticResponse {
  pagination?: { current_page?: number; total_pages?: number };
  data?: RawArtwork[] | RawArtwork | null;
  config?: { iiif_url?: string };
}

/**
 * Construye la URL de una imagen IIIF.
 * Patrón oficial del museo: `{iiif_url}/{image_id}/full/{ancho},/0/default.jpg`
 */
export function buildImageUrl(
  iiifUrl: string | undefined,
  imageId: string | null | undefined,
  width: number,
): string | null {
  if (!imageId) return null;
  const base = (iiifUrl || IIIF_FALLBACK).replace(/\/+$/, '');
  return `${base}/${imageId}/full/${width},/0/default.jpg`;
}

/** `artist_display` viene con varias líneas: nos quedamos con la primera. */
function firstLine(value: string | null | undefined): string | null {
  if (!value) return null;
  const line = value.split('\n')[0]?.trim();
  return line ? line : null;
}

/** Quita etiquetas HTML y espacios de más del texto del museo. */
function stripHtml(value: string | null | undefined): string | null {
  if (!value) return null;
  const text = value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text : null;
}

/**
 * Convierte un registro crudo al tipo de la app.
 * @param requireImage si es `true`, descarta las obras sin imagen (la galería
 *        no puede mostrar miniaturas de obras sin `image_id`; en la API hay
 *        más de 10.000 así).
 */
function toArtwork(
  raw: RawArtwork,
  iiifUrl: string | undefined,
  requireImage = true,
): Artwork | null {
  if (requireImage && !raw.image_id) return null;

  return {
    id: String(raw.id),
    title: raw.title?.trim() || 'Sin título',
    artist: firstLine(raw.artist_display),
    artistDisplay: raw.artist_display ?? null,
    date: raw.date_display ?? null,
    medium: raw.medium_display ?? null,
    department: raw.department_title ?? null,
    isPublicDomain: raw.is_public_domain === true,
    imageUrl: buildImageUrl(iiifUrl, raw.image_id, IMAGE_WIDTH_CARD),
  };
}

/** Petición común con manejo de errores: red, estado HTTP y JSON. */
async function request(path: string): Promise<ArticResponse> {
  let response: Response;
  try {
    response = await fetch(`${ARTIC_API_BASE}${path}`);
  } catch {
    throw new ArtApiError(
      'No se pudo conectar con el Art Institute of Chicago. Comprueba tu conexión a internet.',
    );
  }

  if (!response.ok) {
    throw new ArtApiError(
      `El museo respondió con un error ${response.status}. Inténtalo de nuevo.`,
      response.status,
    );
  }

  try {
    return (await response.json()) as ArticResponse;
  } catch {
    throw new ArtApiError('La respuesta del museo no es un JSON válido.');
  }
}

/**
 * Devuelve una página de la galería.
 * @param page número de página (empieza en 1)
 * @param q texto de búsqueda; si está vacío se lista el catálogo completo
 */
export async function fetchArtworks(options: {
  page?: number;
  q?: string;
}): Promise<ArtworkPage> {
  const page = Math.max(1, options.page ?? 1);
  const term = (options.q ?? '').trim().replace(/\s+/g, ' ');

  const path = term
    ? `/artworks/search?q=${encodeURIComponent(term)}&page=${page}&limit=${ARTWORKS_PAGE_SIZE}&fields=${LIST_FIELDS}`
    : `/artworks?page=${page}&limit=${ARTWORKS_PAGE_SIZE}&fields=${LIST_FIELDS}`;

  const json = await request(path);

  const raw = Array.isArray(json.data) ? json.data : [];
  const currentPage = json.pagination?.current_page ?? page;
  const totalPages = json.pagination?.total_pages ?? 1;

  // La búsqueda no permite pasar de 10.000 registros (12 por página = página 833).
  const limitReached = term && currentPage * ARTWORKS_PAGE_SIZE >= SEARCH_MAX_RECORDS;

  return {
    items: raw.flatMap((item) => {
      const artwork = toArtwork(item, json.config?.iiif_url);
      return artwork ? [artwork] : [];
    }),
    page: currentPage,
    totalPages,
    hasMore: currentPage < totalPages && !limitReached,
  };
}

/** Devuelve el detalle completo de una obra por su id. */
export async function fetchArtwork(id: string): Promise<ArtworkDetail> {
  const json = await request(
    `/artworks/${encodeURIComponent(id)}?fields=${DETAIL_FIELDS}`,
  );

  const raw = json.data;
  if (!raw || Array.isArray(raw)) {
    throw new ArtApiError('No encontramos esa obra en la colección.', 404);
  }

  // En el detalle sí mostramos la ficha aunque no haya imagen.
  const artwork = toArtwork(raw, json.config?.iiif_url, false);
  if (!artwork) {
    throw new ArtApiError('No se pudo leer la información de esa obra.');
  }

  return {
    ...artwork,
    description: stripHtml(raw.description),
    placeOfOrigin: raw.place_of_origin ?? null,
    creditLine: raw.credit_line ?? null,
    classification: raw.classification_title ?? null,
    apiLink: raw.api_link ?? null,
  };
}
