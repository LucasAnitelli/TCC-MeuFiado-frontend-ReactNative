import Typography from "../../components/Typography";
import styled from "styled-components/native";
import palette from "../../theme/palette";

export const Container = styled.View`
  height: 56px;
  background-color: ${palette.primary};
  flex-direction: row;
  padding: 0 16px;
`;

export const LeftBox = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const TitleBox = styled.View`
  flex: 1;
  padding-left: 16px;
`;

export const TitleHeader = styled(Typography).attrs({
  size: 20,
  color: palette.white,
})``;

export const IconLeftClick = styled.TouchableOpacity``;

export const IconRightClick = styled.TouchableOpacity``;

export const IconEditClick = styled.TouchableOpacity``;

export const RightBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
`;