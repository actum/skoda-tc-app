import { StyleSheet, View } from 'react-native';
import Icon from '@/src/components/icon/index';
import { flowColorsRgbaTextPrimary } from '@/src/assets/styles';
import React from 'react';

interface ICheckBoxIcon {
  isLarge?: boolean;
  size: number;
}

export default function CheckIcon(props: ICheckBoxIcon) {
  return (
    <View style={styles.root}>
      <Icon
        type={'check'}
        size={props.size}
        color={flowColorsRgbaTextPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(120, 250, 174, 1)',
    borderRadius: 50,
    padding: 0,
  },
});
