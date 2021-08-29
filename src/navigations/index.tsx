import React from 'react';
import AuthNavigation from './auth.navigation';
import AppNavigation from './app.navigation';
import { useAuth } from '../contexts/auth';
import LoadingScreen from '../views/LoadingScreen';

const Navigation: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />
  }

  return signed ? <AppNavigation /> : <AuthNavigation />;
};

export default Navigation;
