// PageHeader.tsx
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '@/src/components/icon';

interface IPageHeader {
  title?: string; // Změněno na volitelný
  backAction: () => void;
}

export default function PageHeader(props: IPageHeader) {
  return (
    <View style={styles.root}>
      {/* Levá část s ikonou pro akci zpět */}
      <TouchableOpacity
        onPress={props.backAction}
        style={styles.iconContainer}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Icon type={'chevron-left'} size={32} color={'#fff'} />
      </TouchableOpacity>

      {/* Střední část s nadpisem, která se zobrazí pouze pokud je title poskytnut */}
      {props.title && (
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    left: 10,
    position: 'absolute', // Nastavení pozice ikony vlevo
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Vycentrování obsahu ve středu
    height: 60, // Nastavení výšky pro správné zarovnání
    // backgroundColor: '#000', // Přidání pozadí pro lepší viditelnost
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center', // Zarovná text na střed
    justifyContent: 'center',
  },
});
