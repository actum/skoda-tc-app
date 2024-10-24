import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Licence } from '@/src/connections/request/Data';
import StyledButton from '@/src/components/button/StyledButton';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { CardItemsContext } from '@/src/providers/CardItemsProvider';
import {
  flowColorsRgbaOnSurface0,
  flowColorsRgbaSurfaceQuarternary,
} from '@/src/assets/styles';

export default function PaymentProccessComponent() {
  const [data, setData] = useState<Licence[]>([]);
  const navigate = useNavigate();
  const cardContext = useContext(CardItemsContext);
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

  return (
    <View style={styles.root}>
      <View style={styles.items}>
        <ScrollView style={styles.scrollContainer}></ScrollView>
      </View>
      <View style={styles.summary}>
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
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 80,
  },
  summary: {
    backgroundColor: flowColorsRgbaSurfaceQuarternary,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    position: 'absolute',
    width: '100%', // Vertikálně centrované tlačítko
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
