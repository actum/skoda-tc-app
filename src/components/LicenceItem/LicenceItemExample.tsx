import { StyleSheet, Text, View } from 'react-native';
import LicenceItem from '@/src/components/LicenceItem/index';
import { Category } from '@/src/connections/request/Data';
import useCarState from '@/src/components/carState';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import LicenceRenewSection from '@/src/components/LicenceItem/LicenceRenewSection';

export default function LicenceItemExample() {
  const { car } = useCarState();
  const navigate = useNavigate();

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }
  const categories: Category[] = [
    {
      name: 'Tarif Powerpass',
      licences: [
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
      ],
    },
    {
      name: 'Skoda Connect services',
      licences: [
        {
          name: 'Media Streaming',
          price: 1000,
          code: 'x01',
          purchasedLicense: {
            endDate: '2024-06-27',
          },
        },
        {
          name: 'Care Connect - Remote Access',
          price: 1000,
          code: 'x02',
        },
      ],
    },
  ];

  return (
    <View style={styles.root}>
      <LicenceRenewSection />
      {categories.map((category, key) => (
        <View key={key}>
          <Text style={styles.categoryText}>{category.name}</Text>
          {category.licences.map((value, index) => {
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
                {index !== category.licences.length - 1 && (
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

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderColor: '#F3F3F31F',
  },
  categoryText: {
    color: '#fff',
    fontFamily: 'SKODA Next',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  root: {
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
