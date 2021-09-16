import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { CONST } from '~/assets/Constants';
import Icon from '~/assets/icons';
import { STR } from '~/assets/Strings';
import KeyValuePairController from '~/controllers/KeyValuePairController';
import palette from '~/theme/palette';
import Logger from '~/utils/Logger';

const CameraView: React.FC = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [loading, setLoading] = useState(false);

  /**
   * controllers
   */
  const kvpCtr = new KeyValuePairController();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return goBack() });
    return () => BackHandler.removeEventListener('hardwareBackPress', () => { return goBack() });
  }, []);

  const goBack = () => {
    navigation.goBack()
    return true;
  }

  async function hasAndroidPermission() {
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
        const options = { quality: 0.1, base64: true, fixOrientation: true, skipProcessing: true };
        const data = await camera.takePictureAsync(options);

        ToastAndroid.show('Foto capturada com sucesso!', ToastAndroid.SHORT);

        const json = await kvpCtr.get(CONST.SELECTED_PHOTO);
        const photo = JSON.parse(json);

        await kvpCtr.delete(CONST.SELECTED_PHOTO);
        await kvpCtr.set(
          CONST.SELECTED_PHOTO,
          JSON.stringify({
            ...photo,
            uri: data.uri,
          })
        );

        navigation.goBack();
      } catch (error) {
        Logger('Erro>', error);
        ToastAndroid.show(STR.CAMERA.TAKE_PICTURE_ERROR, ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    }
  };

  function flipCamera() {
    if (type === RNCamera.Constants.Type.back) {
      setType(RNCamera.Constants.Type.front);
    } else {
      setType(RNCamera.Constants.Type.back);
    }
  }

  async function accessGallery() {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.1,
      },
      async (response) => {
        if (!!response.uri) {
          try {
            const json = await kvpCtr.get(CONST.SELECTED_PHOTO);
            const photo = JSON.parse(json);

            await kvpCtr.delete(CONST.SELECTED_PHOTO);
            await kvpCtr.set(
              CONST.SELECTED_PHOTO,
              JSON.stringify({
                ...photo,
                uri: response.uri,
              })
            );
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
      style={{ flex: 1, paddingBottom: 24, justifyContent: 'flex-end', alignItems: 'center' }}
      androidCameraPermissionOptions={{
        title: STR.CAMERA.PERMISSION_DIALOG_TITLE,
        message: STR.CAMERA.PERMISSION_DIALOG_MESSAGE,
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
              justifyContent: 'space-between',
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
              <Icon name="IconGallery" size={24} fill={palette.dark} />
            </TouchableOpacity>
            {
              <TouchableOpacity
                style={{
                  flex: 0,
                  backgroundColor: palette.white,
                  padding: 20,
                  alignSelf: 'center',
                  borderRadius: 150,
                }}
                disabled={loading}
                onPress={() => takePicture(camera)}>
                {loading ? (
                  <ActivityIndicator color={palette.primary} size={40} />
                ) : (
                  <Icon name="IconCameraPhoto" size={40} fill={palette.dark} />
                )}
              </TouchableOpacity>
            }

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
              onPress={flipCamera}>
              <Icon name="IconFlipCamera" size={24} fill={palette.dark} />
            </TouchableOpacity>
          </View>
        );
      }}
    </RNCamera>
  );
};

export default CameraView;
