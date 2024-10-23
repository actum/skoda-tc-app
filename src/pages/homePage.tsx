import BaseContainer from '@/src/components/containers/BaseContainer';
import LicenceItemExample from '@/src/components/LicenceItem/LicenceItemExample';
import PageHeader from '@/src/components/pageHeader';
import { ScrollView } from 'react-native';
import React from 'react';

export default function HomePage() {
  return (
    <BaseContainer>
      <ScrollView
        style={{
          marginBottom: 80,
        }}
      >
        <PageHeader title={'Paid services'} backAction={() => {}} />
        <LicenceItemExample />
      </ScrollView>
    </BaseContainer>
  );
}
