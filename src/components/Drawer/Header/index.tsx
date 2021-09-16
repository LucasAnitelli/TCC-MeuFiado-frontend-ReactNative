import { useAuth } from '../../../contexts/auth';
import React, { useEffect, useState } from 'react';
import { ContainerHeader, ContainerIcon, ContainerIconBack, ContainerImg, Name, Photo } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../../theme/palette';
import NoImg from "../../../assets/no-img.png";
import { DrawerHeaderProps } from './types';
import { DrawerActions } from '@react-navigation/native';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { photoDTO } from '../../../dto/storage';

const DrawerHeader: React.FC<DrawerHeaderProps> = (props: DrawerHeaderProps) => {
  const { handleChange, navigation } = props;
  const { user } = useAuth();
  const [nameEstablishment, setNameEstablishment] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const json = await AsyncStorage.getItem('@MeuFiado:photo');
    const photo = JSON.parse(json) as photoDTO;
    setPhoto(photo?.uri);
    setNameEstablishment(user?.nameEstablishment);
  }

  const accessCamera = () => {
    navigation.navigate('CameraView');
  }

  return (
    <ContainerHeader>
      <View style={{ alignItems: 'flex-end' }}>
        <ContainerIconBack onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Icon name="chevron-left" size={16} color={palette.dark} />
        </ContainerIconBack>
      </View>
      <ContainerImg>
        {photo ?
          <Photo source={{ uri: photo }} />
          :
          <Photo source={NoImg} />
        }
        <ContainerIcon onPress={accessCamera}>
          <Icon name="camera" size={16} color={palette.white} />
        </ContainerIcon>
      </ContainerImg>
      <Name>{nameEstablishment}</Name>
    </ContainerHeader>
  );
}
export default DrawerHeader;