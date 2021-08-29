import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInView from '../views/SignInView';
import RegisterView from '../views/RegisterView';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="SignInView">
      <AuthStack.Screen name="SignInView" component={SignInView} />
      <AuthStack.Screen name="RegisterView" component={RegisterView} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
