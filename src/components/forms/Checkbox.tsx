// Checkbox.tsx
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  useController,
  Control,
  FieldValues,
  RegisterOptions,
  FieldPath,
} from 'react-hook-form';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsRgbaTextPrimary,
  flowColorsSemanticAlert,
} from '@/src/assets/styles';

interface CheckboxProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label?: string;
  labelPosition?: 'left' | 'right';
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

function Checkbox<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  labelPosition = 'right',
  color = flowColorsRgbaTextPrimary,
  borderColor = flowColorsRgbaBrandSecondary,
  backgroundColor = flowColorsRgbaBrandSecondary,
  size = 20,
  style = {},
  labelStyle = {},
  disabled = false,
}: CheckboxProps<T>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  const handlePress = () => {
    if (!disabled) {
      onChange(!value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {label && labelPosition === 'left' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {value && <View style={[styles.checkmark, { borderColor: color }]} />}
      </View>
      {label && labelPosition === 'right' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderWidth: 2,
    borderColor: flowColorsRgbaBrandSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2, // Optional: Makes the checkbox slightly rounded
  },
  checkmark: {
    width: 6,
    height: 7.5,
    transform: [{ rotate: '45deg' }],
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: flowColorsRgbaTextPrimary, // Bude přepsáno inline stylem
  },
  label: {
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: 'SKODANext-Light',
  },
  errorText: {
    color: flowColorsSemanticAlert,
    fontFamily: 'SKODANext-Light',
    marginTop: 5,
  },
});

export default Checkbox;
