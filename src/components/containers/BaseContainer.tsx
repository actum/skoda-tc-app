import { Platform, StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';
import { CarNavigation } from '@/src/components/car-navigation/CarNavigation';
import useCarState from '@/src/components/carState';
import { flowColorsTransparentPrimary } from '@/src/assets/styles';

export default function BaseContainer({ children }: { children: ReactNode }) {
  const catState = useCarState();
  return (
    <View style={styles.container}>
      {catState.car && (
        <View style={styles.menu}>
          <CarNavigation />
        </View>
      )}
      <View style={styles.children}>{children}</View>
      {!catState.car && (
        <View style={styles.navigation}>
          <Navigation />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  children: {
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  container: {
    backgroundColor: flowColorsTransparentPrimary,
    position: 'relative',
  },
  navigation: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  menu: {
    width: '100%',
  },
});
