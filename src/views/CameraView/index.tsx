import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import palette from '../../theme/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { patchSavePhotoController } from '../../controller/userController';

interface Params {
  isDrawerHeader: boolean;
}

const CameraView: React.FC = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { isDrawerHeader } = route.params as Params

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return goBack() });
    return () => BackHandler.removeEventListener('hardwareBackPress', () => { return goBack() });
  }, []);

  const goBack = () => {
    navigation.goBack()
    return true;
  }

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }


  const takePicture = async (camera: RNCamera) => {
    if (hasAndroidPermission) {
      setLoading(true);
      try {
        const option = { quality: 0.1, base64: true, fixOrientation: true, skipProcessing: true };
        const data = await camera.takePictureAsync(option);

        ToastAndroid.show('Foto capturada com sucesso!', ToastAndroid.SHORT);

        const json = await AsyncStorage.getItem('@MeuFiado:photo');
        const photo = JSON.parse(json);
        await AsyncStorage.removeItem('@MeuFiado:photo');
        await AsyncStorage.setItem(
          "@MeuFiado:photo",
          JSON.stringify({
            ...photo,
            uri: data.uri,
          })
        );
        if (isDrawerHeader) {
          let data = new FormData()
          if (photo) {
            data.append('avatar', {
              type: 'image/jpeg',
              name: 'image.jpg',
              uri: photo.uri,
            })
            await patchSavePhotoController(data)
          }
        }
        navigation.goBack();
      } catch (error) {
        ToastAndroid.show('Não foi possível tirar foto', ToastAndroid.LONG);
      }
    }
    setLoading(false);
  }

  const accessGallery = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.1,
      },
      async (response) => {
        if (!!response.assets[0].uri) {
          try {
            const json = await AsyncStorage.getItem('@MeuFiado:photo');
            const photo = JSON.parse(json);
            await AsyncStorage.removeItem('@MeuFiado:photo');
            await AsyncStorage.setItem(
              "@MeuFiado:photo",
              JSON.stringify({
                ...photo,
                uri: response.assets[0].uri,
              })
            );
            if (isDrawerHeader) {
              let data = new FormData()
              if (photo) {
                data.append('avatar', {
                  type: 'image/jpeg',
                  name: 'image.jpg',
                  uri: photo.uri,
                })
                await patchSavePhotoController(data)
              }
            }
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show('Algo de errado ocorreu', ToastAndroid.LONG);
          }
        }
      }
    );
  }

  return (
    <RNCamera
      style={{
        flex: 1,
        paddingBottom: 24,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      androidCameraPermissionOptions={{
        title: 'Permissão para usar camera',
        message: 'Precisamos de sua permissão para usar sua câmera',
        buttonPositive: 'Ok',
      }}
      type={type}
      captureAudio={false}
      flashMode={RNCamera.Constants.FlashMode.auto}>
      {({ camera }) => {
        return (
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              paddingHorizontal: 24,
            }}>
            <TouchableOpacity
              style={{
                flex: 0,
                backgroundColor: palette.white,
                padding: 8,
                alignSelf: 'center',
                borderRadius: 20,
                width: 40,
                height: 40,
              }}
              onPress={accessGallery}>
              <Icon name="image" size={20} color={palette.dark} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0,
                backgroundColor: palette.white,
                padding: 20,
                alignSelf: 'center',
                borderRadius: 150,
                marginLeft: Dimensions.get('window').width * 0.22,
              }}
              disabled={loading}
              onPress={() => takePicture(camera)}>
              {loading ?
                <ActivityIndicator color={palette.primary} size={30} />
                :
                <Icon name="camera" size={30} color={palette.dark} />}
            </TouchableOpacity>
          </View>
        );
      }}
    </RNCamera>
  );
}

export default CameraView;