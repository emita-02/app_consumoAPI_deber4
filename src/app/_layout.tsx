import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display/400Regular';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display/700Bold';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { QueryProvider } from '@/queries/query-provider';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Importaciones profundas a propósito: importar del paquete raíz de
  // @expo-google-fonts empaquetaría TODAS las variantes (más de 6 MB).
  const [fontsLoaded, fontsError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Si las fuentes fallan seguimos adelante con las del sistema: nunca bloqueamos
  // el arranque. Mientras cargan no pintamos nada y el splash nativo aguanta
  // (preventAutoHideAsync), así no se ve texto con una fuente y luego "salta".
  const fontsReady = fontsLoaded || Boolean(fontsError);

  return (
    // QueryProvider es la capa más externa: restaura la caché persistida y reanuda
    // mutaciones pausadas antes de que cualquier pantalla pida datos.
    <QueryProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" />
        {fontsReady ? <AnimatedSplashOverlay /> : null}
        {fontsReady ? <AppTabs /> : null}
      </ThemeProvider>
    </QueryProvider>
  );
}
