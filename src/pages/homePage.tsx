import { useContext } from 'react';
import { UserContext } from '@/src/providers/UserContext';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useNavigate } from 'react-router-native';
import LicenceItemExample from '@/src/components/LicenceItem/LicenceItemExample';
import PageHeader from '@/src/components/pageHeader';

export default function HomePage() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <BaseContainer>
      <PageHeader title={'Paid services'} backAction={() => {}} />
      <LicenceItemExample />
      <StyledButton
        title={'Detail'}
        onPress={() => {
          console.log('on PRESS', RouteKey.detail.replace(':id', 'PROD01'));
          navigate(RouteKey.detail.replace(':id', 'PROD01'));
        }}
      />
    </BaseContainer>
  );
}
