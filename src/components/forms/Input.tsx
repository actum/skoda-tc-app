import { useController } from 'react-hook-form';
import { Control, FieldPath, FieldPathValue } from 'react-hook-form/dist/types';
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  flowColorsRgbaSurfaceSecondary,
  flowColorsSemanticAlert,
} from '@/_src/assets/styles';
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
  const { field, fieldState } = useController({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    control: props.control as FieldPath<T>,
    name: props.name as FieldPath<Value>,
    defaultValue: '' as FieldPathValue<FieldValues, FieldPath<FieldValues>>,
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
        value={field.value as string}
        onChangeText={field.onChange}
      />
      {fieldState.error?.message && (
        <Text style={styles.errorText}>{fieldState.error.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: flowColorsSemanticAlert,
    fontFamily: 'SKODANext-Light',
    marginTop: 5,
  },
  label: {
    fontFamily: 'SKODANext-Light',
  },
  root: {
    alignItems: 'center',
    backgroundColor: flowColorsRgbaSurfaceSecondary,
    fontFamily: 'SKODANext-Light',
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
