import React from "react";
import { View } from "react-native";
import palette from "../../../theme/palette";
import { Container, ContainerIcon, ContainerInput, IconRightClick } from "./styles";
import { InputProps } from "./types";
import Icon from 'react-native-vector-icons/FontAwesome';


const Input: React.FC<InputProps> = (props) => {
  const { placeholder, value, handleChange, label, rightClick, isPassVisible } = props;

  return (
    <>
      <Container>
        <ContainerInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={palette.gray}
          {...props}
        />
        <ContainerIcon>
          {rightClick &&
            <IconRightClick onPress={rightClick}>
              <Icon name={!isPassVisible ? "eye" : "eye-slash"} size={24} color={palette.dark} />
            </IconRightClick>
          }
        </ContainerIcon>
      </Container>
    </>
  );
};

export default Input;
