import { StyleSheet, Text, View } from 'react-native';
import StyledButton from '@/src/components/button/StyledButton';
import Icon from '@/src/components/icon';
import React from 'react';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';

interface ILicenceRenewSection {
  size?: 'large' | 'normal';
}

export default function LicenceRenewSection(props: ILicenceRenewSection) {
  const navagate = useNavigate();

  return (
    <View style={styles.root}>
      <View style={styles.descriptionRow}>
        <View style={styles.icon}>
          <View style={styles.iconWrapped}>
            <Icon type={'warning'} size={18} color={'black'} />
          </View>
        </View>
        <View style={styles.texts}>
          <Text style={styles.title}>Some of your services have expired</Text>
          <Text style={styles.description}>
            Renew your services for a more comfortable driving experience.
          </Text>
        </View>
      </View>
      <StyledButton
        title={'Renew expired services'}
        onPress={() => {
          navagate(RouteKey.renew);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    color: '#C4C6C7',
    fontSize: 14,
  },
  descriptionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    paddingTop: 10,
  },
  iconWrapped: {
    backgroundColor: 'rgba(253, 88, 88, 1)',
    borderRadius: 50,
    padding: 0,
  },
  root: {
    backgroundColor: '#303132',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  texts: {
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontFamily: 'SKODA Next',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
