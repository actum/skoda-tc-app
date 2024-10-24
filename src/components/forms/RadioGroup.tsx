import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsRgbaDisabledPrimary,
  flowColorsRgbaDisabledTertiary,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';
import useCarState from '@/src/components/carState';

interface RadioGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
}

function RadioGroup<T extends FieldValues>({
  name,
  control,
  rules,
  options,
}: RadioGroupProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
  });

  const { car } = useCarState();

  const styles = inputStyles({ car });
  const handlePress = (optionValue: string, isDisabled?: boolean) => {
    if (!isDisabled) {
      onChange(optionValue);
    }
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => handlePress(option.value, option.disabled)}
          activeOpacity={option.disabled ? 1 : 0.8} // Změna opacity při disabled
          disabled={option.disabled}
        >
          <View
            style={[
              styles.radioOuter,
              {
                borderColor: option.disabled
                  ? flowColorsRgbaDisabledPrimary
                  : value === option.value
                    ? flowColorsRgbaBrandSecondary
                    : flowColorsRgbaDisabledTertiary,
              },
            ]}
          >
            {value === option.value && !option.disabled && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: flowColorsRgbaBrandSecondary },
                ]}
              />
            )}
          </View>
          <Text
            style={[
              styles.label,
              {
                color: option.disabled
                  ? flowColorsRgbaDisabledPrimary
                  : flowColorsRgbaOnSurface0,
              },
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const inputStyles = (props: { car: boolean }) =>
  StyleSheet.create({
    label: {
      fontFamily: 'SKODANext-Light',
      fontSize: props.car ? 24 : 16,
    },
    radioContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 10,
    },
    radioInner: {
      borderRadius: 6,
      height: 12,
      width: 12,
    },
    radioOuter: {
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 2,
      height: 24,
      justifyContent: 'center',
      marginRight: 10,
      width: 24,
    },
  });

export default RadioGroup;
