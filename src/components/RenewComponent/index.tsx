import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Licence } from '@/src/connections/request/Data';
import useCarState from '@/src/components/carState';
import RenewItem from '@/src/components/RenewComponent/RenewItem';
import { useForm } from 'react-hook-form';
import StyledButton from '@/src/components/button/StyledButton';
import React, { useContext, useEffect } from 'react';
import { CardItemsContext } from '@/src/providers/CardItemsProvider';

export interface RenewFormData extends Record<string, boolean> {
  // agreeToTerms: string;
}

export default function RenewComponent() {
  const licences: Licence[] = [
    {
      name: 'Charge Free',
      price: 1000,
      code: 'x01',
      purchasedLicense: {
        endDate: '2025-06-27',
      },
    },
    {
      name: 'Test 2',
      price: 1000,
      code: 'x02',
    },
    {
      name: 'Test 3',
      price: 1000,
      code: 'x03',
      purchasedLicense: {
        endDate: '2024-06-27',
      },
    },
    {
      name: 'Test 5',
      price: 1000,
      code: 'x05',
      purchasedLicense: {
        endDate: '2024-06-27',
      },
    },
  ];
  const { car } = useCarState();

  function getDefaultValues(): RenewFormData {
    const values: Record<string, boolean> = {};
    licences.forEach((licence) => {
      values[licence.code] = true;
    });
    return values;
  }

  const { control, handleSubmit, watch } = useForm<RenewFormData>({
    defaultValues: getDefaultValues(),
  });
  const formValues = watch();

  const calculateTotalPrice = () => {
    let total = 0;
    licences.forEach((licence) => {
      if (formValues[licence.code]) {
        total += licence.price;
      }
    });

    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  const total = calculateTotalPrice();

  const cardCtx = useContext(CardItemsContext);

  function onSubmit(data: RenewFormData) {
    const newLicences: Licence[] = [];
    licences.forEach((licence) => {
      if (formValues[licence.code]) {
        newLicences.push(licence);
      }
    });
    console.log('FORM SUBMIT DATA', data);
    console.log('NEW LICENCES', newLicences);
    cardCtx.setItems(newLicences);
  }

  return (
    <View style={styles.root}>
      <View style={styles.items}>
        <ScrollView style={styles.scrollContainer}>
          {licences.map((value, index) => {
            return (
              <View key={index}>
                <RenewItem
                  identifier={value.code}
                  control={control}
                  price={value.price}
                  size={car ? 'large' : 'normal'}
                  text={{
                    description: '1 year extension',
                    title: value.name,
                  }}
                />
                {index !== licences.length - 1 && (
                  <View style={styles.border}></View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.summary}>
        <View style={styles.totalTexts}>
          <View>
            <Text style={styles.total}>Price Total</Text>
          </View>
          <View style={styles.prices}>
            <Text style={styles.price}>{total} CZK</Text>
            <Text style={styles.vat}>including VAT</Text>
          </View>
        </View>
        <View>
          <StyledButton
            title={'Continue to Checkout'}
            onPress={(e) => {
              handleSubmit(onSubmit)(e);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderColor: '#F3F3F31F',
  },
  items: {
    height: '80%',
  },
  price: {
    color: '#fff',
    fontFamily: 'SKODA Next',
    fontSize: 24,
    fontWeight: 'bold',
  },
  prices: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
  },
  root: {
    position: 'relative',
  },
  scrollContainer: {
    marginBottom: 80,
  },
  summary: {
    backgroundColor: '#303132',
    bottom: 0,
    gap: 20,
    justifyContent: 'center',
    left: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    position: 'absolute',
    width: '100%', // Vertikálně centrované tlačítko
  },
  total: {
    color: '#fff',
    fontFamily: 'SKODA Next',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalTexts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vat: {
    color: '#C4C6C7',
    fontFamily: 'SKODA Next',
    fontSize: 16,
  },
});
