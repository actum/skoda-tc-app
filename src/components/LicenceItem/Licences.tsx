import { StyleSheet, Text, View } from 'react-native';
import LicenceItem from '@/src/components/LicenceItem/index';
import useCarState from '@/src/components/carState';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import LicenceRenewSection from '@/src/components/LicenceItem/LicenceRenewSection';
import {
  flowColorsRgbaOnSurface0,
  flowColorsRgbaTransparentTertiary,
} from '@/src/assets/styles';
import { useContext, useEffect } from 'react';
import { CategoryContext } from '@/src/providers/CategoryProvider';

export default function Licences() {
  const { car } = useCarState();
  const navigate = useNavigate();

  const categoryContext = useContext(CategoryContext);

  useEffect(() => {
    categoryContext.loadCategories();
  }, []);

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }
  const categories = categoryContext.items;

  console.log('----categories----', categories);

  const styles = StyleSheet.create({
    border: {
      borderBottomWidth: 1,
      borderColor: flowColorsRgbaTransparentTertiary,
    },
    carCategoryText: {
      color: flowColorsRgbaOnSurface0,
      fontFamily: 'SKODA Next',
      fontSize: 26,
      fontWeight: car ? 'normal' : 'bold',
      marginLeft: 15,
      paddingHorizontal: 60,
    },
    categoryText: {
      color: flowColorsRgbaOnSurface0,
      fontFamily: 'SKODA Next',
      fontSize: 20,
      fontWeight: car ? 'normal' : 'bold',
      paddingHorizontal: car ? 10 : 0,
    },
    root: {
      flexDirection: 'column',
      gap: 20,
      paddingBottom: car ? 20 : 200,
      paddingHorizontal: car ? 10 : 15,
      paddingTop: 20,
    },
  });

  return (
    <View style={styles.root}>
      {!car && <LicenceRenewSection />}
      {categories.map((category, key) => (
        <View key={key}>
          {car ? (
            <Text style={styles.carCategoryText}>{category.name}</Text>
          ) : (
            <Text style={styles.categoryText}>{category.name}</Text>
          )}
          {category.productList.map((value, index) => {
            let iconType: 'success' | 'warning' | 'normal' = 'normal';
            let description = 'Available for Purchase';
            if (value.purchasedLicense?.endDate) {
              if (new Date(value.purchasedLicense?.endDate) > new Date()) {
                iconType = 'success';
                description = `Active until ${formatDate(value.purchasedLicense.endDate)}`;
              } else {
                iconType = 'warning';
                description = `Expired on ${formatDate(value.purchasedLicense.endDate)}`;
              }
            }

            return (
              <View key={index}>
                <LicenceItem
                  size={car ? 'large' : 'normal'}
                  icon={iconType}
                  text={{
                    description: description,
                    title: value.name,
                  }}
                  action={() => {
                    navigate(RouteKey.detail.replace(':id', value.code));
                  }}
                />
                {index !== category.productList.length - 1 && (
                  <View style={styles.border}></View>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}
