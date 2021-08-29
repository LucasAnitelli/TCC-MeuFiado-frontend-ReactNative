import React, { useState } from "react";
import { ToastAndroid, Keyboard } from "react-native";
import StatusBarD from "../../utils/StatusBarD";
import {
  Container,
  ContainerForm,
  Logo,
  LogoContainer,
  Title,
} from "./styles";
import LogoImg from "../../assets/logo.png";
import Button from "../../components/Button";
import palette from "../../theme/palette";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Form/Input";
import { useAuth } from "../../contexts/auth";

const SignInView: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  const handleRegister = () => {
    setEmail('');
    setPassword('');
    navigation.navigate("RegisterView");
  };

  const handleSave = () => {
    setLoading(true);
    if (email === '' || password === '') {
      ToastAndroid.show(
        'Por favor, verificar se todos os campos estão corretos.',
        ToastAndroid.LONG,
      );
      Keyboard.dismiss();
      setLoading(false);
      return false;
    }
    signIn(email, password);
    setLoading(false);
  };

  const handleEye = () => {
    setPassVisible(!passVisible);
  }

  StatusBarD("dark");
  return (
    <Container behavior="height">
      <LogoContainer>
        <Logo source={LogoImg} />
        <Title>Meu Fiado</Title>
      </LogoContainer>
      <ContainerForm>
        <Input
          handleChange={(e) => {
            setEmail(e);
          }}
          placeholder="email"
          value={email}
        />
        <Input
          handleChange={(e) => {
            setPassword(e);
          }}
          placeholder="senha"
          secureTextEntry={!passVisible}
          value={password}
          rightClick={handleEye}
          isPassVisible={!passVisible}
        />
        <Button
          style={{ marginTop: 16 }}
          handleClick={handleSave}
          title="Login"
          backgroundColor={palette.primary}
          textColor={palette.white}
          loading={loading}
        />
        <Button
          style={{ marginTop: 16 }}
          handleClick={handleRegister}
          title="Cadastre-se"
          backgroundColor={palette.white}
          textColor={palette.primary}
        />
      </ContainerForm>
    </Container>
  );
};

export default SignInView;
