import React, { useState } from "react";
import { View, ScrollView, Alert, Keyboard, ToastAndroid } from "react-native";
import LogoImg from "../../assets/logo.png";
import {
  Container,
  ContainerButton,
  ContainerForm,
  Logo,
  LogoContainer,
  Title,
} from "./styles";
import Button from "../../components/Button";
import palette from "../../theme/palette";
import StatusBarD from "../../utils/StatusBarD";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Form/Input";
import { createUserDTO } from "dto/login";
import { postCreateUserController } from "../../controller/userController";

const RegisterView: React.FC = () => {
  const navigation = useNavigation();

  const [nameEstablishment, setNameEstablishment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  StatusBarD("dark");

  const handleSave = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      if (nameEstablishment === '' || email === '' || password === '' || password != confirmPassword) {
        ToastAndroid.show(
          'Por favor, verificar se todos os campos estão corretos.',
          ToastAndroid.LONG,
        );
        setLoading(false);
        return;
      }
      const data: createUserDTO = {
        nameEstablishment: nameEstablishment,
        email: email,
        password: password
      };
      const response = await postCreateUserController(data);
      console.log('response', response);
      if (response.Success) {
        ToastAndroid.show(
          'Usuário criado com sucesso',
          ToastAndroid.LONG,
        );
        setLoading(false);
        navigation.goBack();
      } else {
        ToastAndroid.show(response.Message, ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao criar', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  return (
    <Container behavior="height">
      <ScrollView showsVerticalScrollIndicator={false}>
        <LogoContainer>
          <Logo source={LogoImg} />
          <Title>Meu Fiado</Title>
        </LogoContainer>
        <ContainerForm>
          <Input
            placeholder="nome estabelecimento"
            value={nameEstablishment}
            handleChange={(e) => {
              setNameEstablishment(e);
            }}
          />
          <Input
            placeholder="email"
            value={email}
            handleChange={(e) => {
              setEmail(e);
            }}
          />
          <Input
            placeholder="senha"
            value={password}
            handleChange={(e) => {
              setPassword(e);
            }}
            secureTextEntry={true}
          />
          <Input
            placeholder="confirmar senha"
            value={confirmPassword}
            handleChange={(e) => {
              setConfirmPassword(e);
            }}
            secureTextEntry={true}
          />
          <Button
            style={{ marginTop: 16 }}
            title="Registrar"
            handleClick={handleSave}
            backgroundColor={palette.primary}
            textColor={palette.white}
            loading={loading}
          />
        </ContainerForm>
      </ScrollView>
    </Container>
  );
};

export default RegisterView;
