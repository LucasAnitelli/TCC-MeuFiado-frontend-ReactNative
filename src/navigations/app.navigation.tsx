import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import DrawerContent from '../components/Drawer/Content';
import React from 'react';
import ContentFlowView from './content.flow';

const AppDrawer = createDrawerNavigator();

const AppRoutes: React.FC = () => (
  <AppDrawer.Navigator
    edgeWidth={0}
    initialRouteName="ContentFlowView"
    drawerContent={(props: DrawerContentComponentProps<DrawerContentOptions>) => (
      <DrawerContent {...props} />
    )}>
    <AppDrawer.Screen name="ContentFlowView" component={ContentFlowView} />
  </AppDrawer.Navigator>
);

export default AppRoutes;
