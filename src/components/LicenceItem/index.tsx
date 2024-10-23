import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { flowTypographyMediumBody } from '@/src/assets/styles';
import Icon from '@/src/components/icon';

interface ILicenceItem {
  size?: 'normal' | 'large';
  icon: 'success' | 'warning'; // Typ ikony, kterou chcete zobrazit
  text: {
    title: string;
    description: string;
  };
  action: () => void; // Akce na stisknutí položky
}

export default function LicenceItem(props: ILicenceItem) {
  const isWarning = props.icon === 'warning';

  const iconColor = isWarning
    ? 'rgba(253, 88, 88, 1)'
    : 'rgba(120, 250, 174, 1)'; // Červená pro warning, zelená pro success

  const isLarge = props.size === 'large';

  return (
    <TouchableOpacity
      onPress={props.action}
      style={[
        styles.root,
        isLarge && { paddingVertical: 40, paddingHorizontal: 20 },
      ]}
    >
      <View style={[styles.icon, isLarge && { paddingRight: 20 }]}>
        <View
          style={{
            backgroundColor: iconColor,
            borderRadius: 50,
            padding: 0,
          }}
        >
          <Icon
            type={isWarning ? 'warning' : 'check'}
            size={isLarge ? 42 : 24}
            color={'black'}
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isLarge && { fontSize: 32 }]}>
          {props.text.title}
        </Text>
        <Text style={[styles.description, isLarge && { fontSize: 24 }]}>
          {props.text.description}
        </Text>
      </View>
      <View style={styles.action}>
        <MaterialIcons
          name="chevron-right"
          size={isLarge ? 64 : 38}
          color="#ffffff"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    paddingLeft: 10,
  },
  description: {
    color: '#aaa', // Šedý text pro popis
    fontSize: 14,
  },
  icon: {
    paddingRight: 10,
  },
  root: {
    alignItems: 'center',
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontFamily: flowTypographyMediumBody.fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
