import { Text, View } from 'react-native';
import ButtonsExample from '@/src/components/button/ButtonsExample';

export default function HomeScreen() {
  return (
    <View style={{ paddingTop: 50 }}>
      <Text style={{ fontSize: 30 }}> HOME </Text>
      <ButtonsExample />
    </View>
  );
}
