import { View } from 'react-native';
import StyledButton from './StyledButton';

export default function ButtonsExample() {
  return (
    <View style={{ paddingTop: 50, gap: 10, padding: 10 }}>
      <StyledButton title="Save Billing Address" variant="primary" />
      <StyledButton title="Cancel" variant="secondary" />
      <StyledButton title={'TEST'} />
    </View>
  );
}
