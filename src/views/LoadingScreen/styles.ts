import styled from 'styled-components/native';
import palette from '../../theme/palette';


export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${palette.white};
  flex: 1;
`;

export const ContainerLogo = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 125px;
  height: 125px;
`;
