import { Platform, StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';
import { CarNavigation } from '@/src/components/car-navigation/CarNavigation';
import useCarState from '@/src/components/carState';
import {
  flowColorsRgbaOnSurface900,
  flowColorsRgbaTransparentPrimary,
} from '@/src/assets/styles';

export default function BaseContainer({ children }: { children: ReactNode }) {
  const { car } = useCarState();

  if (car) {
    return (
      <View style={styles.carContainer}>
        <View>
          <CarNavigation />
        </View>
        <View style={styles.children}>{children}</View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      <View style={styles.navigation}>
        <Navigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carContainer: {
    backgroundColor: 'rgba(22, 23, 24, 1)',
    position: 'relative',
  },
  children: {
    height: '100%',
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  container: {
    backgroundColor: flowColorsRgbaOnSurface900,
    position: 'relative',
  },
  navigation: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
