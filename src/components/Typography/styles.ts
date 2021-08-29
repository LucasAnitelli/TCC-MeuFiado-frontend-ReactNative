import styled from 'styled-components/native';
import {TypographyDTO} from './types';
import palette from '../../theme/palette';
import {fontSize} from '../../utils/Dimensions';

export const ContainText = styled.Text`
  font-family: 'Inter-Regular';
  color: ${(props: TypographyDTO) =>
    props.color ? props.color : palette.dark};
  font-size: ${(props: TypographyDTO) =>
    fontSize(props.size ? props.size : 10)};
`;
