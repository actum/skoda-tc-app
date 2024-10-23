import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsTextPrimary,
} from '@/src/assets/styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary'; // Přidání varianty pro různé barvy tlačítka
}

export default function StyledButton(props: IButton) {
  const [isHovered, setIsHovered] = useState(false);

  const variant = props.variant == 'secondary' ? 'secondary' : 'primary';

  const buttonStyle =
    variant === 'secondary' ? styles.secondary : styles.primary;

  return (
    <TouchableOpacity
      {...props}
      style={[buttonStyle, isHovered && styles.hover]}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
      <Text style={[styles.text, variant === 'primary' && styles.textPrimary]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hover: {
    opacity: 0.5, // Mírné snížení opacity při stisknutí
  },
  primary: {
    alignItems: 'center',
    backgroundColor: flowColorsRgbaBrandSecondary,
    borderRadius: 50,
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  text: {
    color: '#fff',
    fontFamily: 'SKODANext-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: flowColorsTextPrimary,
  },
});
