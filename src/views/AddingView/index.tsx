import React, { useState } from 'react';
import { Keyboard, ToastAndroid, View } from 'react-native';
import { Container, ContainerButton, ContainerForm } from './styles';
import Button from '../../components/Button';
import palette from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Input from '../../components/Form/Input';
import { removeMask, useMask } from '../../utils/Mask';
import { debtorsDTO } from '../../dto/debtorsDTO';
import { addDebtorController } from '../../controller/debtorsController';

const AddingView: React.FC = () => {
  const navigation = useNavigation();

  const [nameDebtor, setNameDebtor] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      if (date === '' || value === '' || nameDebtor === '' || product === '') {
        ToastAndroid.show(
          'Por favor, preencher todos os campos!',
          ToastAndroid.LONG,
        );
        setLoading(false);
        return;
      }
      const bodyData: debtorsDTO = {
        date: useMask('dateConvert', date),
        nameDebtor: nameDebtor,
        value: removeMask('removeMoneyMask', value),
        product: product,
      };
      const response = await addDebtorController(bodyData);
      console.log('response', response);
      if (response.Success) {
        ToastAndroid.show('Adicionado com sucesso!!', ToastAndroid.SHORT);
        setLoading(false);
        navigation.goBack();
      } else {
        ToastAndroid.show('Não foi possível adicionar', ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show('Erro ao adicionar', ToastAndroid.LONG);
    }
    setLoading(false);
  }

  return (
    <>
      <Header
        title="Adicionar"
        leftClick={() => {
          navigation.goBack();
        }} />
      <View style={{ flex: 1 }} />
      <ContainerForm>
        <Input
          placeholder="nome"
          handleChange={(e) => {
            setNameDebtor(e);
          }}
          value={nameDebtor} />
        <Input
          placeholder="data"
          handleChange={(e) => {
            setDate(useMask('dateFor', e));
          }}
          value={date}
          keyboardType="numeric" />
        <Input
          placeholder="preço"
          handleChange={(e) => {
            setValue(useMask('moneymask', e));
          }}
          value={value}
          keyboardType="numeric" />
        <Input
          placeholder="produto"
          handleChange={(e) => {
            setProduct(e);
          }}
          value={product} />
        <Button
          style={{ marginTop: 16 }}
          handleClick={handleAdd}
          title="Confirmar"
          backgroundColor={palette.primary}
          textColor={palette.white}
          loading={loading} />
      </ContainerForm>
    </>
  );
};

export default AddingView;
