import { Route, Routes } from 'react-router-native';
import { RouteKey } from '../components/navigation/Navigation';
import HomePage from '@/src/pages/homePage';
import DetailPage from '@/src/pages/detailPage';
import RenewPage from '@/src/pages/renewPage';
import ChangeBillingAddress from '@/src/pages/changeBillingAddress';
import CheckouPage from '@/src/pages/checkouPage';
import PaymentProcessPage from '@/src/pages/paymentProcessPage';
import ChangePayment from '@/src/pages/changePayment';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={RouteKey.home} element={<HomePage />} />
      <Route path={RouteKey.renew} element={<RenewPage />} />
      <Route path={RouteKey.checkout} element={<CheckouPage />} />
      <Route path={RouteKey.paymentProcess} element={<PaymentProcessPage />} />
      <Route path={RouteKey.detail} element={<DetailPage />} />
      <Route
        path={RouteKey.changeBillingAddress}
        element={<ChangeBillingAddress />}
      />
      <Route path={RouteKey.changePayment} element={<ChangePayment />} />
    </Routes>
  );
}
