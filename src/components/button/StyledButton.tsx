import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsRgbaTextPrimary,
} from '@/src/assets/styles';

interface IButton extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary'; // Přidání varianty pro různé barvy tlačítka
  style?: StyleProp<ViewStyle>;
}

export default function StyledButton(props: IButton) {
  const [isHovered, setIsHovered] = useState(false);

  const variant = props.variant == 'secondary' ? 'secondary' : 'primary';

  const buttonStyle =
    variant === 'secondary' ? styles.secondary : styles.primary;

  return (
    <TouchableOpacity
      {...props}
      style={[props.style, buttonStyle, isHovered && styles.hover]}
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
    paddingVertical: 14,
  },
  secondary: {
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  text: {
    color: '#fff',
    fontFamily: 'SKODANext-Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: flowColorsRgbaTextPrimary,
  },
});
