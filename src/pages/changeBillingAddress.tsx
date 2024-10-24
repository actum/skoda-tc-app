import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import PageHeader from '@/src/components/pageHeader';
import { View } from 'react-native';
import { Input } from '@/src/components/forms/Input';
import { useForm } from 'react-hook-form';

export default function ChangeBillingAddress() {
  const { control, handleSubmit } = useForm<any>();

  function onSubmit(data: any) {
    alert(
      `firstName: ${data.firstName}, lastName: ${data.lastName}, checkbox: ${data.agreeToTerms}`,
    );
  }

  return (
    <BaseContainer>
      <PageHeader title={'Change Billing Address'} backAction={() => {}} />
      <View style={{ flexDirection: 'column', gap: 20, padding: 20 }}>
        <Input
          label={'First name *'}
          name={'firstName'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'Last name *'}
          name={'lastName'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'Street *'}
          name={'street'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'House number *'}
          name={'houseNumber'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'ZIP code *'}
          name={'zipCode'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'City *'}
          name={'city'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'Country of registration'}
          name={'countryRegistration'}
          control={control}
          rules={{ required: 'Required' }}
          editable={false}
          defaultValue={'Czechia'}
        />
        <Input
          label={'Invoicing country *'}
          name={'invoicingCountry'}
          control={control}
          rules={{ required: 'Required' }}
          editable={false}
          defaultValue={'Czechia'}
        />
        <Input
          label={'E-mail *'}
          name={'email'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <Input
          label={'Phone number *'}
          name={'phoneNumber'}
          control={control}
          rules={{ required: 'Required' }}
        />
        <StyledButton
          title="Save Billing Address"
          onPress={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        />
      </View>
    </BaseContainer>
  );
}
