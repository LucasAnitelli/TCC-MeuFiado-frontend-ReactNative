import { TouchableOpacityProps } from "react-native";

export interface ButtonStyle {
  color?: string;
  backgroundColor?: string;
}

export interface ButtonProps extends ButtonStyle, TouchableOpacityProps {
  icon: string;
  handleClick: () => void;
}