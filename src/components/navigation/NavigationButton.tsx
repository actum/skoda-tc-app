import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon, { IconType } from '@/src/components/icon';

interface MNavigationButtonProps {
  icon: IconType;
  title: string;
  onPress?: () => void;
  isActive?: boolean; // Pro zvýraznění aktivní položky
}

export default function NavigationButton({
  icon,
  title,
  onPress,
  isActive,
}: MNavigationButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Icon type={icon} size={32} color={isActive ? '#7FFFB0' : '#fff'} />
      <Text style={[styles.menuText, isActive && styles.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeText: {
    color: '#7FFFB0', // Zelená barva pro aktivní text
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
});
