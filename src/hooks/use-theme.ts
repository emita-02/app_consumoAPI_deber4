/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  // React Native 0.88: useColorScheme() devuelve 'light' | 'dark' | null
  // (el antiguo valor 'unspecified' ya no existe en los tipos).
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}
