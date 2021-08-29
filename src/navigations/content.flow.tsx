import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChangeView from '../views/ChangeView';
import AddingView from '../views/AddingView';
import MainView from '../views/MainView';
import SearchingView from '../views/SearchingView';

const ContentStack = createStackNavigator();

const ContentNavigator: React.FC = () => {
  return (
    <ContentStack.Navigator headerMode="none" initialRouteName="MainView">
      <ContentStack.Screen name="MainView" component={MainView} />
      <ContentStack.Screen name="ChangeView" component={ChangeView} />
      <ContentStack.Screen name="AddingView" component={AddingView} />
      <ContentStack.Screen name="SearchingView" component={SearchingView} />
    </ContentStack.Navigator>
  );
};

export default ContentNavigator;
