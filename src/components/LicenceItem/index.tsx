import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon, { IconType } from '@/src/components/icon';
import {
  flowColorsRgbaOnSurface0,
  flowColorsRgbaTextPrimary,
} from '@/src/assets/styles';
import CheckIcon from '@/src/components/icon/CheckIcon';

interface ILicenceItem {
  size?: 'normal' | 'large';
  icon: 'success' | 'warning' | 'normal';
  text: {
    title: string;
    description: string;
  };
  action: () => void;
}

export default function LicenceItem(props: ILicenceItem) {
  let iconColor = 'unset';
  let type: IconType = 'bag';
  if (props.icon === 'warning') {
    iconColor = 'rgba(253, 88, 88, 1)';
    type = 'warning';
  }

  if (props.icon === 'success') {
    iconColor = 'rgba(120, 250, 174, 1)';
    type = 'check';
  }

  const isLarge = props.size === 'large';

  return (
    <TouchableOpacity
      onPress={props.action}
      style={[
        styles.root,
        isLarge && { paddingVertical: 40, paddingHorizontal: 20 },
      ]}
    >
      <View style={[styles.icon, isLarge && { paddingRight: 20 }]}>
        <View
          style={{
            backgroundColor: iconColor,
            borderRadius: 50,
            padding: 0,
          }}
        >
          <Icon
            type={type}
            size={isLarge ? 42 : 18}
            color={
              props.icon === 'normal'
                ? flowColorsRgbaOnSurface0
                : flowColorsRgbaTextPrimary
            }
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isLarge && { fontSize: 32 }]}>
          {props.text.title}
        </Text>
        <Text style={[styles.description, isLarge && { fontSize: 24 }]}>
          {props.text.description}
        </Text>
      </View>
      <View style={styles.action}>
        <Icon
          type="chevron-right"
          size={isLarge ? 64 : 24}
          color={flowColorsRgbaOnSurface0}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
  },
  icon: {
    paddingRight: 10,
    paddingTop: 5,
  },
  root: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: flowColorsRgbaOnSurface0,
    fontFamily: 'SKODANext-Regular',
    fontSize: 18,
  },
});
