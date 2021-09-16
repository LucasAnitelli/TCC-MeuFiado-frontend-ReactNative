import { darken } from "polished";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import palette from "../../theme/palette";
import { ButtonStyle } from "./types";


export const Container = styled(Pressable).attrs((props: ButtonStyle) => ({
  elevation: 4,
  android_ripple: {
    color: darken(
      0.2,
      !!props.backgroundColor ? props.backgroundColor : palette.primary
    ),
    borderless: true,
    radius: 28,
  },
})) <ButtonStyle>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${(props) => (!!props.backgroundColor ? props.backgroundColor : palette.white)};
  z-index: 100;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 16px;
  bottom: 16px;
`;

