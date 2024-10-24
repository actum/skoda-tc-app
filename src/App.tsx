import { registerRootComponent } from 'expo';
import { UserProvider } from './providers/UserProvider';
import Router from './router/Router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import CardItemsProvider from '@/src/providers/CardItemsProvider';
import { CategoryProvider } from '@/src/providers/CategoryProvider';
import { ProductProvider } from '@/src/providers/ProductProvider';
import BackLinkProvider from '@/src/providers/BackLinkProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    // SKODA Next Fonts
    'SKODANext-Black': require('@skodaflow/web-tokens/src/fonts/SKODANext-Black.ttf'),
    'SKODANext-Bold': require('@skodaflow/web-tokens/src/fonts/SKODANext-Bold.ttf'),
    'SKODA Next': require('@skodaflow/web-tokens/src/fonts/SKODANext-Regular.ttf'),
    'SKODANext-Light': require('@skodaflow/web-tokens/src/fonts/SKODANext-Light.ttf'),
    'SKODANext-Regular': require('@skodaflow/web-tokens/src/fonts/SKODANext-Regular.ttf'),

    // SKODA NextArabic Fonts
    'SKODANextArabic-Black': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Black.ttf'),
    'SKODANextArabic-Bold': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Bold.ttf'),
    'SKODANextArabic-Light': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Light.ttf'),
    'SKODANextArabic-Regular': require('@skodaflow/web-tokens/src/fonts/SKODANextArabic-Regular.ttf'),

    // SKODA NextIcons Fonts
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
    <UserProvider>
      <CategoryProvider>
        <ProductProvider>
          <CardItemsProvider>
            <BackLinkProvider>
              <Router />
            </BackLinkProvider>
          </CardItemsProvider>
        </ProductProvider>
      </CategoryProvider>
    </UserProvider>
  );
}

registerRootComponent(App);
