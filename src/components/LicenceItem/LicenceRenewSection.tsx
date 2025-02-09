import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StyledButton from '@/src/components/button/StyledButton';
import Icon from '@/src/components/icon';
import React from 'react';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import useCarState from '@/src/components/carState';

interface ILicenceRenewSection {
  size?: 'large' | 'normal';
}

export default function LicenceRenewSection(props: ILicenceRenewSection) {
  const navigate = useNavigate();
  const { car } = useCarState();

  const styles = StyleSheet.create({
    description: {
      color: '#C4C6C7',
      fontSize: car ? 20 : 14,
    },
    descriptionRow: {
      flexDirection: 'row',
      gap: car ? 25 : 10,
    },
    icon: {
      paddingTop: car ? 20 : 5,
    },
    iconWrapped: {
      backgroundColor: 'rgba(253, 88, 88, 1)',
      borderRadius: 50,
      padding: 0,
    },
    root: {
      alignItems: car ? 'flex-start' : 'center',
      backgroundColor: '#303132',
      flexDirection: car ? 'row' : 'column',
      gap: car ? 0 : 10,
      justifyContent: car ? 'space-between' : 'flex-start',
      paddingHorizontal: car ? 30 : 15,
      paddingVertical: 10,
    },
    texts: {
      flexDirection: 'column',
    },
    title: {
      color: '#fff',
      fontFamily: 'SKODA Next',
      fontSize: car ? 28 : 18,
    },
  });

  return (
    <View style={[styles.root, car && { height: 100 }]}>
      <View style={styles.descriptionRow}>
        {car && (
          <TouchableOpacity
            style={styles.icon}
            onPressOut={() => {
              navigate(RouteKey.home);
            }}
          >
            <Icon type={'arrow'} size={32} color={'white'} />
          </TouchableOpacity>
        )}
        <View style={styles.icon}>
          <View style={styles.iconWrapped}>
            <Icon type={'warning'} size={car ? 32 : 18} color={'black'} />
          </View>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>Some of your services have expired</Text>
          <Text style={styles.description}>
            Renew your services for a more comfortable driving experience.
          </Text>
        </View>
      </View>
      <View
        style={
          car
            ? {
                paddingTop: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : undefined
        }
      >
        <StyledButton
          fontSize={car ? 24 : undefined}
          title={'Renew expired services'}
          onPress={() => {
            navigate(RouteKey.renew);
          }}
        />
      </View>
    </View>
  );
}
