import { useController } from 'react-hook-form';
import { Control, FieldPath, FieldPathValue } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  flowColorsRgbaNaturalDarkPrimary,
  flowColorsRgbaNaturalDarkPrimaryQuaternary,
  flowColorsRgbaNaturalDarkTertiary,
  flowColorsRgbaOnSurface0,
  flowColorsRgbaSemanticAlert,
  flowColorsRgbaTextQuaternary,
  flowColorsRgbaTextSecondary,
  flowColorsRgbaTextTertiary,
} from '@/src/assets/styles';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';

export type Value = Record<string, unknown>;

interface Props<T extends Value> extends TextInputProps {
  name: string;
  label?: string;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<Value, FieldPath<Value>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export function Input<T extends Value>(props: Props<T>) {
  const styles = inputStyles(props);
  const { field, fieldState } = useController({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    control: props.control as FieldPath<T>,
    name: props.name as FieldPath<Value>,
    defaultValue:
      props.defaultValue ||
      ('' as FieldPathValue<FieldValues, FieldPath<FieldValues>>),
    rules: props.rules,
  });

  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        {...props}
        style={styles.root}
        autoCapitalize="none"
        id={props.name}
        defaultValue={props.defaultValue}
        value={field.value as string}
        onChangeText={field.onChange}
      />
      {fieldState.error?.message && (
        <Text style={styles.errorText}>{fieldState.error.message}</Text>
      )}
    </View>
  );
}

const inputStyles = <T extends Value>(props: Props<T>) =>
  StyleSheet.create({
    errorText: {
      color: flowColorsRgbaSemanticAlert,
      fontFamily: 'SKODANext-Light',
      marginTop: 5,
    },
    label: {
      backgroundColor:
        props?.editable === false
          ? flowColorsRgbaNaturalDarkPrimaryQuaternary
          : flowColorsRgbaNaturalDarkPrimary,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,

      color:
        props?.editable === false
          ? flowColorsRgbaTextQuaternary
          : flowColorsRgbaTextSecondary,
      fontFamily: 'SKODA Next',
      fontSize: 14,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 7,
    },
    root: {
      alignItems: 'center',
      backgroundColor:
        props?.editable === false
          ? flowColorsRgbaNaturalDarkPrimaryQuaternary
          : flowColorsRgbaNaturalDarkPrimary,
      borderBottomColor: flowColorsRgbaNaturalDarkTertiary,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      borderBottomWidth: 1,
      color:
        props?.editable === false
          ? flowColorsRgbaTextTertiary
          : flowColorsRgbaOnSurface0,
      fontFamily: 'SKODANext-Light',
      fontWeight: '700',
      paddingBottom: 7,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 0,
    },
  });
