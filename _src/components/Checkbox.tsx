// Checkbox.tsx
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { flowColorsBrandPrimary } from '@/app/styles'; // nebo jiná knihovna ikon

interface CheckboxProps {
  isChecked: boolean;
  onChange: (newValue: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  onChange,
  label,
  labelPosition = 'right',
  color = flowColorsBrandPrimary, // Výchozí barva (modrá)
  size = 24, // Výchozí velikost ikon
  style = {},
  labelStyle = {},
}) => {
  const handlePress = () => {
    onChange(!isChecked);
  };

  const checkbox = (
    <View style={[styles.checkbox, { width: size, height: size }]}>
      {isChecked && <Ionicons name="checkmark" size={size - 4} color={color} />}
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {label && labelPosition === 'left' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      {checkbox}
      {label && labelPosition === 'right' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: flowColorsBrandPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginHorizontal: 8,
    fontSize: 16,
  },
});

export default Checkbox;
