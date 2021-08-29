import React from "react";
import { ActivityIndicator, View } from "react-native";
import palette from "../../theme/palette";

import { Container, Title } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = (props) => {
  const { backgroundColor, textColor, title, handleClick, loading } = props;

  const color = textColor ? textColor : palette.white;

  function onPress() {
    if (!loading) {
      handleClick();
    }
  };

  function renderChildren() {
    if (loading) return <ActivityIndicator color={color} />;
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Title textColor={color}>{title}</Title>
      </View>
    );
  }

  return (
    <Container
      backgroundColor={backgroundColor}
      onPress={onPress}
      loading={loading}
      disabled={props.disabled}
      {...props}
    >
      {renderChildren}
    </Container>
  );
};

export default Button;
