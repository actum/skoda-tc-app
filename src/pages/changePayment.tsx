import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import ChangePaymentComponent from '@/src/components/changePaymentComponent';

export default function ChangePayment() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <PageHeader
        title={'Change payment method'}
        backAction={() => {
          navigate(RouteKey.checkout);
        }}
      />
      <ChangePaymentComponent />
    </BaseContainer>
  );
}
