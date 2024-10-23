import { StyleSheet, View } from 'react-native';
import LicenceItem from '@/src/components/LicenceItem/index';
import { Licence } from '@/src/connections/request/Data';

export default function LicenceItemExample() {
  const formattedDate = new Date('2025-06-27').toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const licences: Licence[] = [
    {
      name: 'Charge Free',
      price: 1000,
      code: 'x01',
      purchasedLicense: {
        endDate: formattedDate,
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
        endDate: formattedDate,
      },
    },
  ];

  return (
    <View style={styles.root}>
      {licences.map((value, index) => (
        <View key={index}>
          <LicenceItem
            icon={value.purchasedLicense?.endDate ? 'success' : 'warning'}
            text={{
              description: `${value.purchasedLicense?.endDate ? `Active until ${value.purchasedLicense?.endDate}` : 'Available for Purchase'}`,
              title: value.name,
            }}
            action={() => {}}
          />
          {index !== licences.length - 1 && <View style={styles.border}></View>}
        </View>
      ))}
      {licences.map((value, index) => (
        <View key={index}>
          <LicenceItem
            size={'large'}
            icon={value.purchasedLicense?.endDate ? 'success' : 'warning'}
            text={{
              description: `${value.purchasedLicense?.endDate ? `Active until ${value.purchasedLicense?.endDate}` : 'Available for Purchase'}`,
              title: value.name,
            }}
            action={() => {}}
          />
          {index !== licences.length - 1 && <View style={styles.border}></View>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  root: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
});
