import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {useColorScheme} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
      SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
      'SKODANext-Black': require('@skodaflow/web-tokens/src/fonts/SKODANext-Black.ttf'),
      'SKODANext-Bold': require('@skodaflow/web-tokens/src/fonts/SKODANext-Bold.ttf'),
      'SKODANext-Light': require('@skodaflow/web-tokens/src/fonts/SKODANext-Light.ttf'),
      'SKODANext-Regular': require('@skodaflow/web-tokens/src/fonts/SKODANext-Regular.ttf'),

      // NextArabic Fonts
      'SKODANextArabic-Black': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Black.ttf'),
      'SKODANextArabic-Bold': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Bold.ttf'),
      'SKODANextArabic-Light': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Light.ttf'),
      'SKODANextArabic-Regular': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Regular.ttf'),

      // NextIcons Fonts
      'SKODANextIcons-Filled': require('@skodaflow/web-tokens/src/fonts/SKODANextIcons-Filled.otf'),
      'SKODANextIcons-Regular': require('@skodaflow/web-tokens/src/fonts/SKODANextIcons-Regular.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
