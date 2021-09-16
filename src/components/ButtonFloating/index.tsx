import React from 'react';
import { ButtonProps } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container } from './styles';


const ButtonFloating: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { color, handleClick, backgroundColor, icon } = props;
  return (
    <Container
      backgroundColor={backgroundColor}
      onPress={handleClick}
      {...props}
    >
      <Icon name={icon} size={24} color={color} />
    </Container>
  );
}

export default ButtonFloating;