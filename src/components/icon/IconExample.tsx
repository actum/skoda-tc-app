import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from '@/src/components/icon/index';

export default function IconExample() {
  return (
    <View style={styles.iconContainer}>
      <Icon type={'chevron-left'} size={32} color={'white'} />
      <Icon type={'chevron-right'} size={32} color={'white'} />
      <Icon type={'chevron-up'} size={32} color={'white'} />
      <Icon type={'chevron-bottom'} size={32} color={'white'} />
      <Icon type={'check'} size={32} color={'white'} />
      <Icon type={'warning'} size={32} color={'white'} />
      <Icon type={'bag'} size={32} color={'white'} />
      <Icon type={'tour'} size={32} color={'white'} />
      <Icon type={'map'} size={32} color={'white'} />
      <Icon type={'discover'} size={32} color={'white'} />
      <Icon type={'car'} size={32} color={'white'} />
      <Icon type={'profile'} size={32} color={'white'} />
      <Icon type={'arrow'} size={32} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
