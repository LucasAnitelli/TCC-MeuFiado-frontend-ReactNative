import Typography from '../../../components/Typography';
import styled from 'styled-components/native';
import palette from '../../../theme/palette';
import { Dimensions, Pressable } from 'react-native';
import { darken } from 'polished';

export const ContainerHeader = styled.View`
`;

export const Name = styled(Typography).attrs({
  size: 20,
  color: palette.primary
})`
  font-weight: bold;  
  text-align: center;
  margin-top: 8px;
`;

export const ContainerImg = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  height: 160px;
  width: 160px;
  border-radius: 80px;
`;

export const ContainerIcon = styled(Pressable).attrs({
  android_ripple: {
    color: darken(0.1, palette.white),
    borderless: false,
    radius: 20,
  },
})`
  background-color: ${palette.primary};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  z-Index: 100;
  position: absolute;
  right: 60px;
  bottom: 10px;

`;

export const ContainerIconBack = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;
