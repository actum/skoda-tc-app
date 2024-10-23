import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StatusBar, View } from 'react-native';
import { AppRoutes } from './Routes';
import FlashMessage from 'react-native-flash-message';

export default function Router() {
  return (
    <NativeRouter>
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'rgba(22, 23, 24, 1)'}
        />
        <AppRoutes />
        <FlashMessage
          duration={10000}
          position="top"
          hideOnPress
          style={{
            paddingTop: 40,
          }}
        />
      </View>
    </NativeRouter>
  );
}
