import { View } from 'react-native';
import { Input, Value } from '@/src/components/forms/Input';
import { useForm } from 'react-hook-form';
import StyledButton from '@/src/components/button/StyledButton';

interface IFormData extends Value {
  firstName: string;
  lastName: string;
}

export default function FormExample() {
  const { control, handleSubmit } = useForm<IFormData>();

  function onSubmit(data: IFormData) {
    alert(`firstName: ${data.firstName}, lastName: ${data.lastName}`);
  }

  return (
    <View style={{ flexDirection: 'column', gap: 20, padding: 20 }}>
      <Input
        label={'First Name'}
        name={'firstName'}
        control={control}
        rules={{ required: 'Required message' }}
      />
      <Input
        label={'Last name'}
        name={'lastName'}
        control={control}
        rules={{ required: 'Required message' }}
      />
      <StyledButton
        title="TEST"
        onPress={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      />
    </View>
  );
}
