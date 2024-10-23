import { StyleSheet, Text, View } from 'react-native';

export default function LicenceItem() {
  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <Text>ICON</Text>
      </View>
      <View style={styles.text}>
        <Text>ICON</Text>
      </View>
      <View style={styles.action}>
        <Text>ICON</Text>
      </View>
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
