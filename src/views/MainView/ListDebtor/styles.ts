import Typography from '../../../components/Typography';
import styled from 'styled-components/native';
import palette from '../../../theme/palette';
import { Card } from '../../../theme/card';

export const ButtonRemove = styled.TouchableOpacity`
  width: 70px;
  height: 100%;
  background-color: ${palette.danger};
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 20px;
  flex: 1;
`;

export const ButtonEdit = styled.TouchableWithoutFeedback`
`;

export const Container = styled(Card)`
    margin: 6px 16px 6px 16px;
    background-color: ${palette.white};
    flex-direction: row;
`;

export const Name = styled(Typography).attrs({
  size: 16,
  color: palette.dark,
})` margin-left: 10px; font-weight:bold; flex: 1`;

export const DateClient = styled(Typography).attrs({
  size: 14,
  color: palette.dark,
})` margin-right: 10px`;

export const Price = styled(Typography).attrs({
  size: 14,
  color: palette.dark,
})`margin-right: 10px`;

export const Product = styled(Typography).attrs({
  size: 16,
  color: palette.dark,
})`margin-left: 10px; flex: 1`;

export const ImageAvatar = styled.Image`
   width: 70px;
   border-radius: 4px;
`;

export const ContainerSecondary = styled.View`
  flex: 1;
`;

export const ContainerNameDate = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ContainerProductPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
`;
