
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display/400Regular';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display/700Bold';
import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SyncIndicator } from '@/components/sync-indicator';
import { QueryProvider } from '@/queries/query-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontsError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const fontsReady = fontsLoaded || Boolean(fontsError);

  return (
    <QueryProvider>
      <ThemeProvider
        value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StatusBar style="dark" />

        <View style={{ flex: 1 }}>
          {fontsReady ? <AnimatedSplashOverlay /> : null}
          {fontsReady ? <SyncIndicator /> : null}

          {fontsReady ? (
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="artwork_detail" />
            </Stack>
          ) : null}
        </View>
      </ThemeProvider>
    </QueryProvider>
  );
}
