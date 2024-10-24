import React from 'react';
import { StyleSheet, View } from 'react-native';
import NavigationButton from '@/src/components/navigation/NavigationButton';
import { useNavigate } from 'react-router-native';

export const RouteKey = {
  home: '/',
  renew: '/renew',
  checkout: '/checkout',
  paymentProcess: '/paymentProcess',
  detail: '/detail/:id',
  changeBillingAddress: '/changeBillingAddress',
  changePayment: '/changePayment',
};

export function Navigation() {
  const navigate = useNavigate();

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
        <NavigationButton
          title={'Profile'}
          icon={'profile'}
          isActive
          onPress={() => navigate(RouteKey.home)}
        />
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
