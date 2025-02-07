import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon, { IconType } from '@/src/components/icon';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';

interface MNavigationButtonProps {
  icon: IconType;
  title?: string;
  onPress?: () => void;
  size?: 'small' | 'large';
  isActive?: boolean;
}

export default function NavigationButton({
  size,
  icon,
  title,
  onPress,
  isActive,
}: MNavigationButtonProps) {
  const getSize = (): number => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 38;
    }
    return 32;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Icon
        type={icon}
        size={getSize()}
        color={isActive ? '#7fffb0' : '#fff'}
      />
      {title && (
        <Text
          style={[
            styles.menuText,
            isActive && styles.activeText,
            size === 'large' && styles.largeText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeText: {
    color: flowColorsRgbaBrandSecondary,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: flowColorsRgbaOnSurface0,
    fontSize: 16,
  },
  largeText: {
    fontSize: 22,
  },
});
