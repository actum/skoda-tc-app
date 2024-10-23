import { registerRootComponent } from 'expo';
import { UserProvider } from './providers/UserProvider';
import { ThemeProvider } from '@react-navigation/native';
import Router from './router/Router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    'SKODANext-Black': require('@skodaflow/web-tokens/src/fonts/SKODANext-Black.ttf'),
    'SKODANext-Bold': require('@skodaflow/web-tokens/src/fonts/SKODANext-Bold.ttf'),
    'SKODA Next': require('@skodaflow/web-tokens/src/fonts/SKODANext-Light.ttf'),
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
    <ThemeProvider
      value={{
        dark: true,
        colors: {
          primary: 'rgb(10, 132, 255)',
          background: 'rgb(1, 1, 1)',
          card: 'rgb(18, 18, 18)',
          text: 'rgb(229, 229, 231)',
          border: 'rgb(39, 39, 41)',
          notification: 'rgb(255, 69, 58)',
        },
      }}
    >
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  );
}

registerRootComponent(App);
