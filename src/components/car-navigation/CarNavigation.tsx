import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationButton from '@/src/components/navigation/NavigationButton';
import CustomImage from '@/src/components/image/Image';

export function CarNavigation() {
  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <CustomImage
          source={require('../../assets/images/menu/logo.png')}
          placeholder={require('../../assets/images/placeholder.webp')}
          errorPlaceholder={require('../../assets/images/missing-image.webp')}
          style={styles.customLogo}
          loadingIndicatorColor="#ff0000"
        />
      </View>
      <View style={styles.navigation}>
        <View style={styles.item}>
          <NavigationButton size={'large'} title={'Car'} icon={'car'} />
        </View>
        <View style={styles.item}>
          <NavigationButton size={'large'} title={'Maps'} icon={'map'} />
        </View>
        <View style={styles.item}>
          <NavigationButton size={'large'} title={'Tour'} icon={'tour'} />
        </View>
        <View style={styles.item}>
          <NavigationButton
            size={'large'}
            title={'Discover'}
            icon={'discover'}
          />
        </View>
        <View style={styles.item}>
          <NavigationButton
            size={'large'}
            title={'Profile'}
            icon={'profile'}
            isActive
          />
        </View>
      </View>
      <View style={styles.settings}>
        <View style={{ paddingRight: 70 }}>
          <NavigationButton size={'large'} icon={'search'} />
        </View>
        <View style={styles.settingsItem}>
          <NavigationButton size={'large'} icon={'settings'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
  },
  logo: {
    paddingTop: 4,
    width: 100,
    alignItems: 'center',
  },
  navigation: {
    width: '40%',
    flexDirection: 'row',
    flex: 1,
  },
  settings: {
    width: 450,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  customLogo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    overflow: 'hidden',
  },
  settingsItem: {
    paddingRight: 35,
  },
});
