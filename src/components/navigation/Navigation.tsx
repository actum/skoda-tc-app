import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationButton from '@/src/components/navigation/NavigationButton';

export const RouteKey = {
  home: '/',
  detail: '/detail/:id',
};

export function Navigation() {
  return (
    <View style={styles.root}>
      <View style={styles.item}>
        <NavigationButton title={'Car'} icon={'car'} />
      </View>
      <View style={styles.item}>
        <NavigationButton title={'Maps'} icon={'map'} />
      </View>
      <View style={styles.item}>
        <NavigationButton title={'Tour'} icon={'tour'} />
      </View>
      <View style={styles.item}>
        <NavigationButton title={'Discover'} icon={'discover'} />
      </View>
      <View style={styles.item}>
        <NavigationButton title={'Profile'} icon={'profile'} isActive />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  root: {
    backgroundColor: 'rgba(35, 36, 37, 1)',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20,
  },
});
