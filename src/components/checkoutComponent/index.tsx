import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Licence } from '@/src/connections/request/Data';
import StyledButton from '@/src/components/button/StyledButton';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { CardItemsContext } from '@/src/providers/CardItemsProvider';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { UserContext } from '@/src/providers/UserContext';
import useCarState from '@/src/components/carState';
import Icon from '@/src/components/icon';
import { BackLinkContext } from '@/src/providers/BackLinkProvider';

export default function CheckoutComponent() {
  const ctxBackLink = useContext(BackLinkContext);
  const { car } = useCarState();
  const userCtx = useContext(UserContext);
  const [data, setData] = useState<Licence[]>([]);
  const navigate = useNavigate();
  const cardContext = useContext(CardItemsContext);

  const calculateTotalPrice = () => {
    let total = 0;
    cardContext.items.forEach((licence) => {
      total += licence.price;
    });

    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const formatCardNumber = (number: string) => {
    if (!number) return '';
    return `${number.slice(0, 4)} **** **** ${number.slice(-4)}`;
  };

  function formatPhoneNumber(number: string) {
    number = number.replace(/\s+/g, '');
    return number.replace(/(\d{3})(?=\d)/g, '$1 ');
  }

  function capitalizeFirstLetter(str: string) {
    if (!str) return '';
    return str[0] + str.slice(1).toLowerCase();
  }

  const styles = StyleSheet.create({
    buttonArea: {
      alignItems: car ? 'flex-start' : 'center',
      justifyContent: 'center',
      paddingHorizontal: car ? 0 : 40,
      paddingTop: 20,
    },
    cardContainder: {
      justifyContent: car ? 'space-between' : 'flex-start',
      width: car ? '45%' : '100%',
    },
    cardInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      alignItems: car ? 'stretch' : 'flex-start',
      flexDirection: car ? 'row' : 'column',
      gap: 20,
      justifyContent: car ? 'space-between' : 'flex-start',
      paddingHorizontal: car ? 85 : 20,
      paddingVertical: 20,
    },
    infos: {
      color: 'rgba(196, 198, 199, 1)',
      fontFamily: 'SKODANext-Light',
      fontSize: car ? 22 : 14,
      fontWeight: '300',
      paddingBottom: car ? 15 : 0,
    },
    items: {
      height: car ? '44%' : '80%',
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
    redirectText: {
      color: 'rgba(196, 198, 199, 1)',
    },
    redirectTextWrapped: {
      alignItems: 'center',
    },
    root: {
      height: '100%',
      position: 'relative',
    },
    scrollContainer: {
      marginBottom: car ? 0 : '50%',
    },
    summary: {
      backgroundColor: '#303132',
      borderRadius: 8,
      bottom: 170,
      justifyContent: 'center',
      left: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      position: 'absolute',
      right: 20,
    },
    title: {
      color: '#fff',
      fontFamily: 'SKODA Next',
      fontSize: car ? 32 : 20,
      fontWeight: car ? 'normal' : 'bold',
      paddingBottom: 20,
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
      paddingBottom: 20,
    },
    vat: {
      color: '#C4C6C7',
      fontFamily: 'SKODA Next',
      fontSize: car ? 22 : 16,
      paddingLeft: car ? 16 : 0,
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.items}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.cardContainder}>
              <View>
                <Text style={styles.title}>Billing address</Text>
                <View>
                  <Text style={styles.infos}>
                    {userCtx.userData?.firstname} {userCtx.userData?.lastname}
                  </Text>
                  <Text style={styles.infos}>
                    {userCtx.userData?.address?.street}{' '}
                    {userCtx.userData?.address?.city}{' '}
                    {userCtx.userData?.address?.postalCode}
                    {', '}
                    {capitalizeFirstLetter(
                      String(userCtx.userData?.address?.country),
                    )}
                  </Text>
                  <Text style={styles.infos}>{userCtx.userData?.email}</Text>
                  <Text style={styles.infos}>
                    {formatPhoneNumber(String(userCtx.userData?.phoneNumber))}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonArea}>
                <StyledButton
                  title={'Change billing address'}
                  style={car ? { width: '70%' } : undefined}
                  fontSize={car ? 22 : undefined}
                  variant={'secondary'}
                  onPress={() => {
                    navigate(RouteKey.changeBillingAddress);
                  }}
                />
              </View>
            </View>
            <View style={styles.cardContainder}>
              <View>
                <Text style={styles.title}>Payment method</Text>
                <View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.infos}>Payment card</Text>
                    <Text style={styles.infos}>
                      {formatCardNumber(
                        String(userCtx.userData?.creditCard?.number),
                      )}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.infos}>Card valid till</Text>
                    <Text style={styles.infos}>
                      {userCtx.userData?.creditCard?.expiryMonth} /{' '}
                      {String(userCtx.userData?.creditCard?.expiryYear).slice(
                        -2,
                      )}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.buttonArea}>
                <StyledButton
                  style={car ? { width: '70%' } : undefined}
                  fontSize={car ? 22 : undefined}
                  title={'Change payment method'}
                  variant={'secondary'}
                  onPress={() => {
                    navigate(RouteKey.changePayment);
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {car ? (
        <View
          style={{
            height: 100,
            backgroundColor: '#303132',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: car ? 25 : 10,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{ paddingTop: 5 }}
              onPressOut={() => {
                if (ctxBackLink.backLink) {
                  navigate(ctxBackLink.backLink);
                  ctxBackLink.setBackLink('');
                  return;
                }
                navigate(RouteKey.renew);
              }}
            >
              <Icon type={'arrow'} size={32} color={'white'} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 28,
                }}
              >
                Price Total {calculateTotalPrice()} CZK
              </Text>
              <Text style={styles.vat}>including VAT</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
            <Text style={styles.vat}>You will be redirected to a pay gate</Text>
            <StyledButton
              style={{ paddingTop: 10, marginTop: 15 }}
              fontSize={car ? 24 : undefined}
              title={'Proceed to payment'}
              onPress={(e) => {
                navigate(RouteKey.paymentProcess);
                // handleSubmit(onSubmit)(e);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={styles.summary}>
          <View>
            <View style={styles.totalTexts}>
              <View>
                <Text style={styles.total}>Price Total</Text>
              </View>
              <View style={styles.prices}>
                <Text style={styles.price}>{calculateTotalPrice()} CZK</Text>
                <Text style={styles.vat}>including VAT</Text>
              </View>
            </View>
            <View>
              <StyledButton
                title={'Proceed to payment'}
                onPress={(e) => {
                  navigate(RouteKey.paymentProcess);
                  // handleSubmit(onSubmit)(e);
                }}
              />
            </View>
            <View style={styles.redirectTextWrapped}>
              <Text style={styles.redirectText}>
                You will be redirected to a pay gate
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
