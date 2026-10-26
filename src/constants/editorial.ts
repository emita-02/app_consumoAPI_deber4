/**
 * Estética editorial de "Artelier": papel de catálogo, tinta oscura y un
 * ocre de latón como acento (el de las cartelas de museo).
 *
 * Los nombres de familia tienen que coincidir con las claves que se registran
 * con `useFonts` en `src/app/_layout.tsx`.
 */
export const Editorial = {
  /** Papel del catálogo (fondo principal). */
  paper: '#F5F1E8',
  /** Papel más profundo (marcos y campos). */
  paperDeep: '#EBE4D6',
  /** Tinta: títulos y texto principal. */
  ink: '#16130F',
  /** Tinta suave: texto secundario. */
  inkSoft: '#5B544A',
  /** Latón: acentos, numeración y separadores finos. */
  brass: '#9B7B49',
  /** Filete (línea fina de catálogo). */
  rule: '#D6CEBE',
  /** Rojo apagado para errores. */
  danger: '#8B3A2F',
  /** Blanco para las cartelas sobre imagen. */
  white: '#FFFFFF',
} as const;

export const Fonts = {
  /** Títulos de marca (Playfair Display Bold). */
  displayBold: 'PlayfairDisplay_700Bold',
  /** Títulos de obra (Playfair Display Regular). */
  display: 'PlayfairDisplay_400Regular',
  /** Texto corrido (Inter Regular). */
  body: 'Inter_400Regular',
  /** Texto de énfasis y versalitas (Inter SemiBold). */
  bodyStrong: 'Inter_600SemiBold',
} as const;
