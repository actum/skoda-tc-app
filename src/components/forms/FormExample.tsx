import { View } from 'react-native';
import { Input, Value } from '@/src/components/forms/Input';
import { useForm } from 'react-hook-form';
import StyledButton from '@/src/components/button/StyledButton';
import Checkbox from '@/src/components/forms/Checkbox';

interface IFormData extends Value {
  firstName: string;
  lastName: string;
    agreeToTerms: boolean;
}

export default function FormExample() {
  const { control, handleSubmit } = useForm<IFormData>();

  function onSubmit(data: IFormData) {
    alert(`firstName: ${data.firstName}, lastName: ${data.lastName}, checkbox: ${data.agreeToTerms}`);
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
      <Checkbox
        name="agreeToTerms"
        control={control}
        label="I agree to the terms and conditions"
        rules={{  }}
        checked={true}
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
