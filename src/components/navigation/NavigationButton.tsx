import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';

interface MNavigationButtonProps {
  icon: string;
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
      <MaterialIcons
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-expect-error
        name={icon}
        size={32}
        color={isActive ? '#7FFFB0' : '#fff'} // Zelená barva pro aktivní položku
      />
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
