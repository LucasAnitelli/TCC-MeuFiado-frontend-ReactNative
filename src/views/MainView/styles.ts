import Typography from "../../components/Typography";
import styled from "styled-components/native";
import palette from "../../theme/palette";

export const ContainerAlert = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextAlert = styled(Typography).attrs({ size: 20, color: palette.dark })`
  font-weight: bold;
  text-align: center;
`;