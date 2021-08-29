import Typography from "../../components/Typography";
import styled from "styled-components/native";
import palette from "../../theme/palette";


export const Container = styled.KeyboardAvoidingView`
  background-color: ${palette.white};
  flex: 1
`;

export const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 110px;
`;

export const Logo = styled.Image`
  width: 125px;
  height: 125px;
`;

export const Title = styled(Typography).attrs({
  size: 24,
  color: palette.primary,
})`
  font-weight: bold;
  text-align: center;
`;

export const ContainerForm = styled.View`
  padding: 16px;
  width: 100%;
`;
