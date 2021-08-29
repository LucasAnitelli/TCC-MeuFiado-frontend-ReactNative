import React, {useCallback} from 'react';
import palette from '../theme/palette';
import {StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const StatusBarD = (
  theme: 'dark' | 'light' = 'light',
  bgColor?: string,
  translucent = false,
) => {
  const backgroundColor = !!bgColor
    ? bgColor
    : theme === 'dark'
    ? palette.white
    : palette.primary;

  return useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(
        theme === 'dark' ? 'dark-content' : 'light-content',
      );
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setTranslucent(translucent);
    }, []),
  );
};

export default StatusBarD;
