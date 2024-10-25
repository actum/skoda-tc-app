import BaseContainer from '@/src/components/containers/BaseContainer';
import PageHeader from '@/src/components/pageHeader';
import { useNavigate } from 'react-router-native';
import { RouteKey } from '@/src/components/navigation/Navigation';
import CheckoutComponent from '@/src/components/checkoutComponent';
import { useContext } from 'react';
import { BackLinkContext } from '@/src/providers/BackLinkProvider';

export default function CheckouPage() {
  const navigate = useNavigate();
  const ctxBackLink = useContext(BackLinkContext);
  return (
    <BaseContainer>
      <PageHeader
        title={'Checkout'}
        backAction={() => {
          if (ctxBackLink.backLink) {
            navigate(ctxBackLink.backLink);
            ctxBackLink.setBackLink('');
            return;
          }
          navigate(RouteKey.renew);
        }}
      />
      <CheckoutComponent />
    </BaseContainer>
  );
}
