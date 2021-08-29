import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  placeholder?: string;
  value: string;
  handleChange: (text: string) => void;
  label?: string;
  rightClick?: () => void;
  isPassVisible?: boolean;
}
