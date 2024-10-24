import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from '@/src/components/forms/Checkbox';
import { Control, FieldPath } from 'react-hook-form';
import { RenewFormData } from '@/src/components/renewComponent/index';

interface IRenewItem {
  identifier: string;
  control: Control<RenewFormData>;
  size: 'large' | 'normal';
  text: {
    title: string;
    description: string;
  };
  price: number;
}

export default function RenewItem(props: IRenewItem) {
  const isLarge = props.size === 'large';

  const styles = StyleSheet.create({
    action: {
      justifyContent: 'center',
      paddingLeft: 10,
    },
    description: {
      color: '#aaa', // Šedý text pro popis
      fontSize: 14,
      fontFamily: 'SKODA Next',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 5,
    },
    price: {
      fontFamily: 'SKODA Next',
      color: '#fff', // Šedý text pro popis
      fontSize: isLarge ? 24 : 16,
      fontWeight: isLarge ? 'normal' : 'bold',
    },
    root: {
      flexDirection: 'row',
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: '#ffffff',
      fontFamily: 'SKODA Next',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View
      style={[
        styles.root,
        isLarge && { paddingVertical: 15, paddingHorizontal: 85 },
      ]}
    >
      <View style={[styles.icon, isLarge && { paddingRight: 10 }]}>
        <Checkbox
          size={isLarge ? 32 : 24}
          name={props.identifier as FieldPath<RenewFormData>}
          control={props.control}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, isLarge && { fontSize: 28 }]}>
          {props.text.title}
        </Text>
        <Text style={[styles.description, isLarge && { fontSize: 22 }]}>
          {props.text.description}
        </Text>
      </View>
      <View style={styles.action}>
        <Text style={styles.price}>{props.price} CZK</Text>
      </View>
    </View>
  );
}
