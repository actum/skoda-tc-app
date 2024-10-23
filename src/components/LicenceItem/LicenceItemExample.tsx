import { StyleSheet, View } from 'react-native';
import {
  flowColorsRgbaBrandSecondary,
  flowColorsTextPrimary,
} from '@/src/assets/styles';

export default function LicenceItemExample() {
  return (
    <View style={styles.root}>
      <View style={styles.icon}>ICON</View>
      <View style={styles.text}>TEXT</View>
      <View style={styles.action}>ACTION</View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {},
  icon: {},
  root: {
    flexDirection: 'row',
  },
  text: {},
});
