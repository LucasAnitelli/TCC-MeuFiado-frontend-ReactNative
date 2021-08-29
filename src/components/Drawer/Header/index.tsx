import { useAuth } from '../../../contexts/auth';
import React, { useEffect, useState } from 'react';
import { ContainerHeader, ContainerIcon, ContainerIconBack, ContainerImg, Name, Photo } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../../theme/palette';
import NoImg from "../../../assets/no-img.png";
import { DrawerHeaderProps } from './types';
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';

const DrawerHeader: React.FC<DrawerHeaderProps> = (props: DrawerHeaderProps) => {
  const { handleChange, navigation } = props;
  const { user } = useAuth();
  const [nameEstablishment, setNameEstablishment] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    loadData();
  }, [user])

  const loadData = () => {
    setNameEstablishment(user.nameEstablishment);
    setPhoto('https://fotos.vivadecora.com.br/decoracao-restaurante-entrada-principal-lucianoleitedesousa-207111-square_cover_xsmall.jpg');
  }



  return (
    <ContainerHeader>
      <View style={{ alignItems: 'flex-end' }}>
        <ContainerIconBack onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Icon name="chevron-left" size={16} color={palette.dark} />
        </ContainerIconBack>
      </View>
      <ContainerImg>
        {photo?.length ?
          <Photo source={{ uri: photo }} />
          :
          <Photo source={NoImg} />
        }
        <ContainerIcon onPress={() => { }}>
          <Icon name="camera" size={16} color={palette.white} />
        </ContainerIcon>
      </ContainerImg>
      <Name>{nameEstablishment}</Name>
    </ContainerHeader>
  );
}
export default DrawerHeader;