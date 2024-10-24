import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import CheckoutComponent from '@/src/components/checkoutComponent';

export default function CheckouPage() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <PageHeader
        title={'Checkout'}
        backAction={() => {
          navigate(RouteKey.renew);
        }}
      />
      <CheckoutComponent />
    </BaseContainer>
  );
}
