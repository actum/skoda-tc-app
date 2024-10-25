import { Input, Value } from '@/src/components/forms/Input';
import StyledButton from '@/src/components/button/StyledButton';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-native';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/src/providers/UserContext';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import { Category } from '@/src/connections/request/Data';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import RadioGroup from '@/src/components/forms/RadioGroup';
import useCarState from '@/src/components/carState';

interface ChangeBillingFormData extends Value {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  VAT?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  type: 'company' | 'user';
}

export default function ChangeBillingAddressComponent() {
  const { car } = useCarState();
  const [isCompany, setIsCompany] = useState(false);

  const userCtx = useContext(UserContext);

  const { control, handleSubmit, watch } = useForm<ChangeBillingFormData>({
    defaultValues: getDefaultValues(),
  });
  const navigate = useNavigate();

  const formCurrentValues = watch();

  useEffect(() => {
    if (formCurrentValues.type === 'company') {
      setIsCompany(true);
      return;
    }
    setIsCompany(false);
  }, [formCurrentValues]);

  function getDefaultValues(): ChangeBillingFormData {
    return {
      country: userCtx.userData?.address?.country,
      email: userCtx.userData?.email,
      houseNumber: String(userCtx.userData?.address?.houseNumber),
      firstName: userCtx.userData?.firstname,
      lastName: userCtx.userData?.lastname,
      phoneNumber: userCtx.userData?.phoneNumber,
      street: userCtx.userData?.address?.street,
      city: userCtx.userData?.address?.city,
      zipCode: userCtx.userData?.address?.postalCode,
      type: 'user',
    };
  }

  function onSubmit(data: ChangeBillingFormData) {
    console.log('DATA', data);
    // alert(`firstName: ${data.firstName}, lastName: ${data.lastName}`);

    SaveData(data);
  }

  async function SaveData(data: ChangeBillingFormData): Promise<void> {
    try {
      const requestData = {
        id: userCtx.userData?.address?.id,
        houseNumber: Number(data.houseNumber),
        street: data.street,
        city: data.city,
        postalCode: data.zipCode,
        addressType: 'BILLING',
        country: data.country,
        email: data.email,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName ?? '',
        VAT: data.VAT ?? '',
      };
      const response = await asyncFetch<Category[]>(
        '/api/v1/users/current/addresses/' + userCtx.userData?.address?.id,
        {
          method: 'PUT',
          body: JSON.stringify(requestData),
        },
      );
      userCtx.reload();
      navigate(RouteKey.checkout);
      // setItems(categories);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN SAVE ADDRESS: ${error.message}`);
    }
  }

  const styles = StyleSheet.create({
    buttonArea: {
      flexDirection: car ? 'row' : 'column',
      gap: 5,
      justifyContent: car ? 'space-between' : 'flex-start',
      paddingBottom: car ? 40 : 80,
      paddingHorizontal: car ? 0 : 50,
    },
    description: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'SKODA Next',
      fontSize: car ? 22 : 12,
    },
    scrollContainer: {
      marginBottom: car ? 0 : 80,
    },
    title: {
      color: 'rgba(255, 255, 255, 1)',
      fontFamily: 'SKODA Next',
      fontSize: car ? 24 : 16,
    },
  });

  return (
    <View style={car ? { height: '60%', paddingHorizontal: 65 } : undefined}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ flexDirection: 'column', gap: 20, padding: 20 }}>
          <Text style={styles.title}>
            Are you ordering for a private person or a company?
          </Text>
          <RadioGroup
            name="type"
            control={control}
            options={[
              { label: 'Private customer', value: 'user' },
              { label: 'Company', value: 'company' },
            ]}
            rules={{ required: 'Required message' }}
          />

          <Text style={styles.description}>
            Which payment card is stored in the "payment method" section depends
            on whether you have selected the private customer or business
            customer option.
          </Text>

          {isCompany && (
            <>
              <Input
                label={'Company name *'}
                name={'companyName'}
                control={control}
                rules={{ required: 'Required' }}
              />
              <Input
                label={'VAT ID no *'}
                name={'VAT'}
                control={control}
                rules={{ required: 'Required' }}
              />
            </>
          )}

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
            label={'Country'}
            name={'country'}
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
          <View style={styles.buttonArea}>
            <StyledButton
              style={car ? { width: '40%' } : undefined}
              fontSize={car ? 22 : undefined}
              title="Save Billing Address"
              onPress={(e) => {
                handleSubmit(onSubmit)(e);
              }}
            />
            <StyledButton
              style={car ? { width: '40%' } : undefined}
              fontSize={car ? 22 : undefined}
              title="Cancel"
              variant={'secondary'}
              onPress={(e) => {
                navigate(RouteKey.checkout);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
