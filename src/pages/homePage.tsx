import { Text, View } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '@/src/providers/UserContext';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useNavigate, useLocation } from 'react-router-native';

export default function HomePage() {
  const location = useLocation();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  console.log('location', location);
  return (
    <BaseContainer>
      <View style={{ paddingTop: 50 }}>
        <Text style={{ fontSize: 30 }}> HOME</Text>
        <Text style={{ fontSize: 20, padding: 20 }}>
          {' '}
          USER: {userCtx.userData?.firstName} {userCtx.userData?.lastName}
        </Text>
        <StyledButton
          title={'Detail'}
          onPress={() => {
            console.log('on PRESS', RouteKey.detail.replace(':id', 'PROD01'));
            navigate(RouteKey.detail.replace(':id', 'PROD01'));
          }}
        />
      </View>
    </BaseContainer>
  );
}
