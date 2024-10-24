import { Input, Value } from '@/src/components/forms/Input';
import StyledButton from '@/src/components/button/StyledButton';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-native';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/src/providers/UserContext';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import RadioGroup from '@/src/components/forms/RadioGroup';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import { Category } from '@/src/connections/request/Data';

interface ChangePaymentComponentFormData extends Value {
  card: 'card';
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export default function ChangePaymentComponent() {
  const userCtx = useContext(UserContext);
  function formatCardNumber(number: string) {
    number = number.replace(/\s+/g, '');
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  const [selectedMethod, setSelectedMethod] = useState<
    'card' | 'paypal' | 'bankTransfer'
  >('card');
  const { control, handleSubmit, watch } =
    useForm<ChangePaymentComponentFormData>({
      defaultValues: {
        card: 'card',
        cvv: String(userCtx.userData?.creditCard?.cvv),
        number: formatCardNumber(String(userCtx.userData?.creditCard?.number)),
        expiryYear: String(userCtx.userData?.creditCard?.expiryYear),
        expiryMonth: String(userCtx.userData?.creditCard?.expiryMonth),
      },
    });
  const navigate = useNavigate();

  const formCurrentValues = watch();

  useEffect(() => {
    setSelectedMethod(formCurrentValues.card);
  }, [formCurrentValues]);

  function onSubmit(data: ChangePaymentComponentFormData) {
    SaveData(data);
  }

  async function SaveData(data: ChangePaymentComponentFormData): Promise<void> {
    try {
      const requestData = {
        id: userCtx.userData?.creditCard?.id,
        number: data.number,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        cvv: data.cvv,
      };
      const response = await asyncFetch<Category[]>(
        '/api/v1/users/current/creditcards/' + userCtx.userData?.creditCard?.id,
        {
          method: 'PUT',
          body: JSON.stringify(requestData),
        },
      );
      userCtx.reload();
      navigate(RouteKey.checkout);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN SAVE PAYMENT METHOD: ${error.message}`);
    }
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ flexDirection: 'column', gap: 15, padding: 20 }}>
        <RadioGroup
          name="card"
          control={control}
          options={[{ label: 'Payment card', value: 'card' }]}
          rules={{ required: 'Required message' }}
        />

        {/* Conditionally render fields based on selected payment method */}
        {selectedMethod === 'card' && (
          <>
            <Input
              label={'Card number'}
              name={'number'}
              control={control}
              rules={{ required: 'Card number is required' }}
            />
            <Input
              label={'expiryMonth'}
              name={'expiryMonth'}
              control={control}
              rules={{ required: 'Card number is required' }}
            />
            <Input
              label={'expiryYear'}
              name={'expiryYear'}
              control={control}
              rules={{ required: 'Card number is required' }}
            />
            <Input
              label={'Security code'}
              name={'cvv'}
              control={control}
              rules={{ required: 'Security code is required' }}
            />
          </>
        )}
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(243, 243, 243, 0.12)',
          }}
        />
        <RadioGroup
          name="paypal"
          control={control}
          options={[{ label: 'Paypal', value: 'paypal', disabled: true }]}
          // rules={{ required: 'Required message' }}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(243, 243, 243, 0.12)',
          }}
        />
        <RadioGroup
          name="bank"
          control={control}
          options={[{ label: 'Bank transfer', value: 'bank', disabled: true }]}
          // rules={{ required: 'Required message' }}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'rgba(243, 243, 243, 0.12)',
          }}
        />
        <View style={styles.buttonArea}>
          <StyledButton
            title="Save Payment Method"
            onPress={(e) => {
              handleSubmit(onSubmit)(e);
            }}
          />
          <StyledButton
            title="Cancel"
            variant={'secondary'}
            onPress={(e) => {
              navigate(RouteKey.checkout);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bankTransfer: {
    marginVertical: 10,
  },
  bankTransferText: {
    color: '#fff',
    fontFamily: 'SKODANext-Light',
    fontSize: 14,
  },
  buttonArea: {
    gap: 5,
    paddingBottom: 40,
    paddingHorizontal: 50,
  },
  paypal: {
    marginVertical: 10,
  },
  paypalText: {
    color: '#fff',
    fontFamily: 'SKODANext-Light',
    fontSize: 14,
  },
  scrollContainer: {
    marginBottom: 80,
  },
  title: {
    color: '#ffffff',
    fontFamily: 'SKODANext-Bold',
    fontSize: 20,
    marginBottom: 20,
  },
});
