import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import ChangeBillingAddressComponent from '@/src/components/changeBillingAddressComponent';

export default function ChangeBillingAddress() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <PageHeader
        title={'Change Billing Address'}
        backAction={() => {
          navigate(RouteKey.checkout);
        }}
      />
      <ChangeBillingAddressComponent />
    </BaseContainer>
  );
}
