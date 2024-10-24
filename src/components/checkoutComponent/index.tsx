import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Licence } from '@/src/connections/request/Data';
import StyledButton from '@/src/components/button/StyledButton';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { CardItemsContext } from '@/src/providers/CardItemsProvider';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { UserContext } from '@/src/providers/UserContext';
import { flowColorsRgbaOnSurface0 } from '@/src/assets/styles';

export default function CheckoutComponent() {
  const userCtx = useContext(UserContext);
  const [data, setData] = useState<Licence[]>([]);
  const navigate = useNavigate();
  const cardContext = useContext(CardItemsContext);
  console.log('userCtx---------------', userCtx);
  //
  // async function loadData() {
  //   try {
  //     const response = await asyncFetch<Licence[]>(
  //       '/api/v1/products/inactive',
  //       {
  //         method: 'GET',
  //       },
  //     );
  //     setData(response);
  //     setTimeout(() => {
  //       reset(getDefaultValues(response));
  //     }, 100);
  //   } catch (e) {
  //     const error = e as HttpApiCallError;
  //     alert(`ERROR WHEN GET CATEGORY: ${error.message}`);
  //   }
  // }
  //
  // useEffect(() => {
  //   loadData();
  // }, []);

  const calculateTotalPrice = () => {
    let total = 0;
    cardContext.items.forEach((licence) => {
      total += licence.price;
    });

    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  console.log('userCtx.userData', userCtx.userData);
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

  return (
    <View style={styles.root}>
      <View style={styles.items}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
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
              <View style={styles.buttonArea}>
                <StyledButton
                  title={'ChangeEvent billing address'}
                  variant={'secondary'}
                  onPress={() => {
                    navigate(RouteKey.changeBillingAddress);
                  }}
                />
              </View>
            </View>
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
                    {String(userCtx.userData?.creditCard?.expiryYear).slice(-2)}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonArea}>
                <StyledButton
                  title={'Change payment method'}
                  variant={'secondary'}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  buttonArea: {
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'column',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infos: {
    color: 'rgba(196, 198, 199, 1)',
    fontFamily: 'SKODANext-Light',
    fontSize: 14,
    fontWeight: '300',
  },
  items: {
    height: '80%',
  },
  price: {
    color: flowColorsRgbaOnSurface0,
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
    position: 'relative',
  },
  scrollContainer: {
    marginBottom: '25%',
  },
  summary: {
    backgroundColor: '#303132',
    borderRadius: 8,
    bottom: 0,
    justifyContent: 'center',
    left: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    position: 'absolute',
    right: 20,
  },
  title: {
    color: flowColorsRgbaOnSurface0,
    fontFamily: 'SKODA Next',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  total: {
    color: flowColorsRgbaOnSurface0,
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
    color: '#c4c6c7',
    fontFamily: 'SKODA Next',
    fontSize: 16,
  },
});
