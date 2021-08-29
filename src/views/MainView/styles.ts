import styled from "styled-components/native";
import palette from "../../theme/palette";

export const ContainerAlert = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextAlert = styled.Text`
  font-size: 20px;
  color: ${palette.dark};
  font-weight: bold;
  text-align: center;
`;