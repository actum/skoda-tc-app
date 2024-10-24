import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from '@/src/components/icon';
import useCarState from '@/src/components/carState';

interface IPageHeader {
  title: string;
  backAction: () => void;
}

export default function PageHeader(props: IPageHeader) {
  const { car } = useCarState();

  const styles = StyleSheet.create({
    carIconContainer: { paddingLeft: 22 },
    carRoot: { alignItems: 'center', flexDirection: 'row', gap: 20 },
    carText: {
      color: '#fff',
      fontSize: 36,
    },
    carTitleContainer: {},
    iconContainer: {
      left: 10,
      position: 'absolute', // Nastavení pozice ikony vlevo
    },
    root: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 60,
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 20,
      fontWeight: car ? 'normal' : 'bold',
    },
    titleContainer: {
      alignItems: 'center', // Zarovná text na střed
      justifyContent: 'center',
    },
  });

  if (car) {
    return (
      <View style={styles.carRoot}>
        <TouchableOpacity
          onPress={props.backAction}
          style={styles.carIconContainer}
        >
          <Icon type={'chevron-left'} size={40} color={'#fff'} />
        </TouchableOpacity>
        <View style={styles.carTitleContainer}>
          <Text style={styles.carText}>{props.title}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={props.backAction} style={styles.iconContainer}>
        <Icon type={'chevron-left'} size={32} color={'#fff'} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </View>
  );
}
