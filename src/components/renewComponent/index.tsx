import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Licence } from '@/src/connections/request/Data';
import useCarState from '@/src/components/carState';
import { useForm } from 'react-hook-form';
import StyledButton from '@/src/components/button/StyledButton';
import React, { useContext, useEffect, useState } from 'react';
import { CardItemsContext } from '@/src/providers/CardItemsProvider';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import RenewItem from '@/src/components/renewComponent/RenewItem';

export interface RenewFormData extends Record<string, boolean> {
  // agreeToTerms: string;
}

export default function RenewComponent() {
  const [data, setData] = useState<Licence[]>([]);
  const navigate = useNavigate();
  const { control, handleSubmit, watch, reset } = useForm<RenewFormData>();
  async function loadData() {
    try {
      const response = await asyncFetch<Licence[]>(
        '/api/v1/products/inactive',
        {
          method: 'GET',
        },
      );
      setData(response);
      setTimeout(() => {
        reset(getDefaultValues(response));
      }, 100);
    } catch (e) {
      const error = e as HttpApiCallError;
      alert(`ERROR WHEN GET CATEGORY: ${error.message}`);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const licences = data;
  const { car } = useCarState();

  function getDefaultValues(licences: Licence[]): RenewFormData {
    const values: Record<string, boolean> = {};
    licences.forEach((licence) => {
      values[licence.code] = true;
    });
    return values;
  }

  const formValues = watch();

  console.log('formValues', formValues);

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
    navigate(RouteKey.checkout);
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
    paddingBottom: 20,
  },
  root: {
    position: 'relative',
  },
  scrollContainer: {
    marginBottom: 80,
  },
  summary: {
    backgroundColor: '#303132',
    borderRadius: 8,
    bottom: 0,
    justifyContent: 'center',
    left: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    right: 20,
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
