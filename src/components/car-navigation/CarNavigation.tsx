import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationButton from '@/src/components/navigation/NavigationButton';
import CustomImage from '@/src/components/image/Image';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useNavigate } from 'react-router-native';

export function CarNavigation() {
  const navigate = useNavigate();

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
            onPress={() => navigate(RouteKey.home)}
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
  customLogo: {
    alignItems: 'center',
    borderRadius: 29,
    height: 58,
    overflow: 'hidden',
    width: 58,
  },
  item: {
    flex: 1,
  },
  logo: {
    alignItems: 'center',
    paddingTop: 4,
    width: 100,
  },
  navigation: {
    flexDirection: 'row',
    flex: 1,
    width: '40%',
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  settings: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 450,
  },
  settingsItem: {
    paddingRight: 35,
  },
});
