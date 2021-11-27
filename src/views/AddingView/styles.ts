import styled from 'styled-components/native';
import { fontSize } from '../../utils/Dimensions';
import palette from '../../theme/palette';
import Typography from '../../components/Typography';

export const ContainerForm = styled.View`
  padding: 16px;
  width: 100%;
`;

export const ContainerDate = styled.View`
  height: 46px;
  padding: 0px 4px;
  margin-top: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${palette.primary};
  flex-direction: row;
`
export const ContainerDateTouch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 46px;
`;

export const DateLabel = styled(Typography).attrs({ size: 16 })``;