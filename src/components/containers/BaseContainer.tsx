import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';
import { ScrollViewProvider } from '../scrollView/ScrollViewProvider';

export default function BaseContainer({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.children}>
        <ScrollViewProvider>{children}</ScrollViewProvider>
      </View>
      <View style={styles.navigation}>
        <Navigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  children: {
    display: 'flex',
    height: '100%',
    paddingTop: 40,
    padding: 5,
  },
  container: {
    backgroundColor: '#e7eaff',
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
  },
  navigation: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  scrollContainer: {
    marginBottom: 80,
  },
});
