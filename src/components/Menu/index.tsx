import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';
import { ButtonMenu } from './styles';

const Menu: React.FC = () => {
  const navigation = useNavigation();
  return (
    <ButtonMenu onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon name="bars" size={24} color={palette.white} />
    </ButtonMenu>
  );
};

export default Menu;
