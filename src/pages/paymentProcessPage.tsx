import BaseContainer from '@/src/components/containers/BaseContainer';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CheckIcon from '@/src/components/icon/CheckIcon';
import React, { useEffect, useState } from 'react';
import StyledButton from '@/src/components/button/StyledButton';
import {
  flowColorsRgbaBrandPrimary,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';
import { asyncFetch } from '@/src/connections/fetch/asyncFetch';
import HttpApiCallError from '@/src/connections/fetch/HttpApiCallError';
import ErrorIcon from '@/src/components/icon/ErrorIcon';

export default function PaymentProcessPage() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    processPayment();
  }, []);

  async function processPayment() {
    try {
      setLoading(true);
      const response = await asyncFetch<unknown>('/api/v1/orders', {
        method: 'POST',
      });
      console.log('processPayment response', response);
    } catch (e) {
      const error = e as HttpApiCallError;
      setError(true);
      // alert(`ERROR WHEN PROCESS ORDER: ${error.message}`);
    } finally {
      setTimeout(async () => {
        setLoading(false);
      }, 2000);
    }
  }

  const navigate = useNavigate();

  if (loading) {
    return (
      <BaseContainer>
        <View style={styles.root}>
          <ActivityIndicator size="large" color={flowColorsRgbaBrandPrimary} />
        </View>
      </BaseContainer>
    );
  }

  if (error) {
    return (
      <BaseContainer>
        <View style={styles.root}>
          <View>
            <ErrorIcon size={60} />
          </View>
          <View>
            <Text style={styles.text}>Internal server error</Text>
          </View>
          <View>
            <StyledButton
              title={'Services overview'}
              variant={'secondary'}
              onPress={() => {
                navigate(RouteKey.home);
              }}
            />
          </View>
        </View>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <View style={styles.root}>
        <View>
          <CheckIcon size={60} />
        </View>
        <View>
          <Text style={styles.text}>Services were successfully renewed</Text>
        </View>
        <View>
          <StyledButton
            title={'Services overview'}
            variant={'secondary'}
            onPress={() => {
              navigate(RouteKey.home);
            }}
          />
        </View>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    margin: 'auto',
  },
  text: {
    color: flowColorsRgbaOnSurface0,
    fontFamily: 'SKODA Next',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 50,
    textAlign: 'center',
  },
});
