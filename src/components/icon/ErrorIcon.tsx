import { StyleSheet, View } from 'react-native';
import Icon from '@/src/components/icon/index';
import { flowColorsRgbaTextPrimary } from '@/src/assets/styles';
import React from 'react';

interface ICheckBoxIcon {
  isLarge?: boolean;
  size: number;
}

export default function ErrorIcon(props: ICheckBoxIcon) {
  return (
    <View style={styles.root}>
      <Icon
        type={'warning'}
        size={props.size}
        color={flowColorsRgbaTextPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(253, 88, 88, 1)',
    borderRadius: 50,
    padding: 0,
  },
});
