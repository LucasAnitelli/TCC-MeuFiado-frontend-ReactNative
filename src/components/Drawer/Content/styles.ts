import Typography from "../../../components/Typography";
import styled from "styled-components/native";
import palette from "../../../theme/palette";
import { darken } from "polished";
import { Pressable } from "react-native";


export const Email = styled(Typography).attrs({
  size: 16,
  color: palette.dark
})` 
  font-weight: bold;
  text-align: center;
`;

export const ContainerEmail = styled.View`
  margin-bottom: 16px;
`;

export const ContainerCard = styled(Pressable).attrs({
  android_ripple: {
    color: darken(0.2, palette.lightgray),
    borderless: false,
  },
})`
  height: 52px;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled(Typography).attrs({
  size: 20,
  color: palette.primary
})`
  margin-left: 20px;
`;


