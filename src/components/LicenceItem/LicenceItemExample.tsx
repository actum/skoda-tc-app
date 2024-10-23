import { StyleSheet, View } from 'react-native';
import LicenceItem from '@/src/components/LicenceItem/index';

export default function LicenceItemExample() {
  return (
    <View style={styles.root}>
      <LicenceItem
        icon={'success'}
        text={{
          description: 'Description',
          title: 'Test',
        }}
        action={() => {}}
      />
      <LicenceItem
        icon={'warning'}
        text={{
          description: 'Description',
          title: 'Test',
        }}
        action={() => {}}
      />
      <LicenceItem
        size={'large'}
        icon={'success'}
        text={{
          description: 'Description',
          title: 'Test',
        }}
        action={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
  },
});
