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
  flowColorsRgbaDisabledTertiary,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';

interface RadioGroupProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  options: Array<{ label: string; value: string }>;
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

  const handlePress = (optionValue: string) => {
    onChange(optionValue);
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => handlePress(option.value)}
        >
          <View
            style={[
              styles.radioOuter,
              {
                borderColor:
                  value === option.value
                    ? flowColorsRgbaBrandSecondary
                    : flowColorsRgbaDisabledTertiary,
              },
            ]}
          >
            {value === option.value && (
              <View
                style={[
                  styles.radioInner,
                  { backgroundColor: flowColorsRgbaBrandSecondary },
                ]}
              />
            )}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: flowColorsRgbaOnSurface0,
    fontFamily: 'SKODANext-Light',
    fontSize: 16, // Nastavení fontu
  },
  radioContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  radioInner: {
    borderRadius: 6,
    height: 12,
    width: 12, // Malý vnitřní kruh
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12, // Kruhový tvar
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // Mezery mezi ikonou a textem
  },
});

export default RadioGroup;
