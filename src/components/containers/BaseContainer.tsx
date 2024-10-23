import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';

export default function BaseContainer({ children }: { children: ReactNode }) {
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
  children: {
    height: '100%',
    paddingTop: 40,
  },
  container: {
    backgroundColor: 'rgba(22, 23, 24, 1)',
    paddingTop: 20,
    position: 'relative',
  },
  navigation: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});
