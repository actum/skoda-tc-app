import { Route, Routes } from 'react-router-native';
import { RouteKey } from '../components/navigation/Navigation';
import HomePage from '@/src/pages/homePage';
import DetailPage from '@/src/pages/detailPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={RouteKey.home} element={<HomePage />} />
      <Route path={RouteKey.detail} element={<DetailPage />} />
    </Routes>
  );
}
