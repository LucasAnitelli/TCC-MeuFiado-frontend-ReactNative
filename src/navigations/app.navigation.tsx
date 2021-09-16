import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import DrawerContent from '../components/Drawer/Content';
import React from 'react';
import ContentFlowView from './content.flow';
import CameraView from '../views/CameraView';

const AppDrawer = createDrawerNavigator();

const AppRoutes: React.FC = () => (
  <AppDrawer.Navigator
    edgeWidth={0}
    initialRouteName="ContentFlowView"
    drawerContent={(props: DrawerContentComponentProps<DrawerContentOptions>) => (
      <DrawerContent {...props} />
    )}>
    <AppDrawer.Screen name="ContentFlowView" component={ContentFlowView} />
    <AppDrawer.Screen name="CameraView" component={CameraView} />
  </AppDrawer.Navigator>
);

export default AppRoutes;
