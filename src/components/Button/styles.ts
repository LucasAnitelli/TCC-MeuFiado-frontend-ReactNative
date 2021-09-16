import { Pressable, Dimensions } from "react-native";
import palette from "../../theme/palette";
import { ButtonStyle } from "./types";
import styled from "styled-components/native";
import { darken } from "polished";
import Typography from "../../components/Typography";

const defineBackgroundColor = (props: ButtonStyle) => {
  if (!!props.disable) return palette.gray;
  return !!props.backgroundColor ? props.backgroundColor : palette.primary;
};

export const Container = styled(Pressable).attrs((props: ButtonStyle) => ({
  android_ripple: {
    color: darken(
      0.2,
      !!props.backgroundColor ? props.backgroundColor : palette.primary
    ),
    borderless: false,
    radius: Dimensions.get("screen").width - 32,
  },
})) <ButtonStyle>`
  height: 56px;
  padding: 0 16px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => defineBackgroundColor(props)};
`;

export const Title = styled(Typography).attrs({ size: 16 }) <ButtonStyle>`
  color: ${(props) => (!!props.textColor ? props.textColor : palette.white)};
  margin: 0 8px;
`;
