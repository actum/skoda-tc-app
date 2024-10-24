import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import RenewComponent from '@/src/components/RenewComponent';

export default function RenewPage() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <PageHeader
        title={'Renew expired services'}
        backAction={() => {
          navigate(RouteKey.home);
        }}
      />
      <RenewComponent />
    </BaseContainer>
  );
}
