import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { useAuth } from '../../../contexts/auth';
import React from 'react';
import { Alert, View } from 'react-native';
import DrawerHeader from '../Header';
import { ContainerCard, ContainerEmail, Email, Title } from './styles';
import palette from '../../../theme/palette';
import Icon from 'react-native-vector-icons/FontAwesome';

const DrawerContent: React.FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
  const { navigation } = props;
  const { user, signOut } = useAuth();

  const logOut = () => {
    Alert.alert('Sair', `Deseja mesmo sair?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => { signOut(); }
      },
    ]);
  };

  return (
    <>
      <DrawerHeader navigation={navigation} />
      <View style={{ flex: 1 }} />
      <ContainerEmail>
        <Email>{user?.email}</Email>
      </ContainerEmail>
      <ContainerCard onPress={logOut}>
        <Icon name="sign-out" size={20} color={palette.primary} style={{ marginLeft: 20 }} />
        <Title>Sair</Title>
      </ContainerCard>
    </>
  );
}

export default DrawerContent;