import React from 'react';
import { ActivityIndicator } from 'react-native';
import palette from '../../theme/palette';
import { Container, ContainerLogo, Logo } from './styles';
import LogoMeuFiado from '../../assets/logo.png';

const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <ContainerLogo>
        <Logo source={LogoMeuFiado} />
      </ContainerLogo>
      <ActivityIndicator size="large" color={palette.primary} />
    </Container>
  );
}

export default LoadingScreen;