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
  flowColorsRgbaDisabledPrimary,
  flowColorsRgbaDisabledSecondary,
  flowColorsRgbaDisabledTertiary,
  flowColorsRgbaTextPrimary,
  flowColorsRgbaSemanticAlert,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';
import useCarState from '@/src/components/carState';

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
  checked?: boolean;
  disabled?: boolean;
}

function Checkbox<T extends FieldValues>({
  name,
  control,
  disabled = false,
  rules,
  label,
  labelPosition = 'right',
  size = 20,
  style = {},
  labelStyle = {},
}: CheckboxProps<T>) {
  const { car } = useCarState();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  // Dynamické styly na základě stavu
  const isChecked = !!value;

  const checkboxColor = disabled
    ? flowColorsRgbaDisabledPrimary
    : flowColorsRgbaTextPrimary;

  const borderColor = disabled
    ? flowColorsRgbaDisabledTertiary
    : isChecked
      ? flowColorsRgbaBrandSecondary
      : flowColorsRgbaDisabledPrimary;

  const backgroundColor = disabled
    ? flowColorsRgbaDisabledSecondary
    : isChecked
      ? flowColorsRgbaBrandSecondary
      : 'transparent';

  const handlePress = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  const styles = StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      borderColor: flowColorsRgbaBrandSecondary,
      borderRadius: 2,
      borderWidth: 2,
      justifyContent: 'center',
    },
    checkmark: {
      borderBottomWidth: 2,
      borderColor: flowColorsRgbaTextPrimary,
      borderRightWidth: 2,
      height: car ? 15 : 7.5,
      transform: [{ rotate: '45deg' }],
      width: car ? 9 : 6,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    errorText: {
      color: flowColorsRgbaSemanticAlert,
      fontFamily: 'SKODANext-Light',
      marginTop: 5,
    },
    label: {
      color: flowColorsRgbaOnSurface0,
      fontFamily: 'SKODANext-Light',
      fontSize: 16,
      marginHorizontal: 8,
    },
  });

  return (
    <View>
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
          {isChecked && (
            <View style={[styles.checkmark, { borderColor: checkboxColor }]} />
          )}
        </View>
        {label && labelPosition === 'right' && (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

export default Checkbox;
