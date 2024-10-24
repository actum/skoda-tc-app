import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import RenewComponent from '@/src/components/renewComponent';
import { View } from 'react-native';
import React from 'react';

export default function RenewPage() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <View style={{ flex: 1 }}>
        <PageHeader
          title={'Renew expired services'}
          backAction={() => {
            navigate(RouteKey.home);
          }}
        />
        <RenewComponent />
      </View>
    </BaseContainer>
  );
}
