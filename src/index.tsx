import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations';
import { AuthProvider } from './contexts/auth';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
