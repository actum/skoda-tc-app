import BaseContainer from '@/src/components/containers/BaseContainer';
import Licences from '@/src/components/LicenceItem/Licences';
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
        <Licences />
      </ScrollView>
    </BaseContainer>
  );
}
