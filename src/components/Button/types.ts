import { TouchableOpacityProps } from "react-native";

export interface ButtonStyle {
  textColor?: string;
  backgroundColor?: string;
  loading?: boolean;
  disable?: boolean;
}

export interface ButtonProps extends ButtonStyle, TouchableOpacityProps {
  title: string;
  handleClick: () => void;
}
