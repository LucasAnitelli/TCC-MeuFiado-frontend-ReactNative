import styled from 'styled-components/native';
import palette from '../../../theme/palette';
import { fontSize } from '../../../utils/Dimensions';

export const Container = styled.View`
  height: 46px;
  padding: 0px 4px;
  margin-top: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${palette.primary};
  flex-direction: row;
`;

export const ContainerInput = styled.TextInput`
  flex: 1;
  margin-left: 4px;
  margin-bottom: -4px;
  color: ${palette.dark};
  font-size: ${fontSize(16, true)};
`;

export const IconRightClick = styled.TouchableOpacity``;

export const ContainerIcon = styled.View`
  justify-content: flex-end;
  padding-bottom: 10px;
  padding-right: 10px;
`;
