import BaseContainer from '@/src/components/containers/BaseContainer';
import LicenceItemExample from '@/src/components/LicenceItem/LicenceItemExample';
import PageHeader from '@/src/components/pageHeader';
import { ScrollView, View } from 'react-native';
import React from 'react';
import LicenceRenewSection from '@/src/components/LicenceItem/LicenceRenewSection';
import useCarState from '@/src/components/carState';

export default function HomePage() {
  const { car } = useCarState();

  return (
    <BaseContainer>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader title={'Paid services'} backAction={() => {}} />
          <Licences />
        </ScrollView>
      </View>
      {car && (
        <View style={{ flex: 1 }}>
          <LicenceRenewSection />
        </View>
      )}
    </BaseContainer>
  );
}
