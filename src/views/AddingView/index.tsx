import React, { useState } from 'react';
import { Keyboard, ToastAndroid, View } from 'react-native';
import { ContainerDate, ContainerDateTouch, ContainerForm, DateLabel } from './styles';
import Button from '../../components/Button';
import palette from '../../theme/palette';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Input from '../../components/Form/Input';
import { removeMask, useMask } from '../../utils/Mask';
import { debtorsDTO } from '../../dto/debtorsDTO';
import { addDebtorController } from '../../controller/debtorsController';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddingView: React.FC = () => {
  const navigation = useNavigation();

  const [nameDebtor, setNameDebtor] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [value, setValue] = useState('');
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);


  const handleAdd = async () => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      if (date.toISOString() === '' || value === '' || nameDebtor === '' || product === '') {
        ToastAndroid.show(
          'Por favor, preencher todos os campos!',
          ToastAndroid.LONG,
        );
        setLoading(false);
        return;
      }
      const bodyData: debtorsDTO = {
        date: useMask('DateMaskSendBack', date.toISOString()),
        nameDebtor: nameDebtor,
        value: removeMask('removeMoneyMask', value),
        product: product,
      };
      const response = await addDebtorController(bodyData);
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

  const showDatepicker = () => {
    setShow(true);
  };

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
        <ContainerDate>
          <ContainerDateTouch onPress={showDatepicker} style={{ flex: 1 }}>
            <DateLabel style={{ paddingHorizontal: 10 }}>
              {!!date ? useMask('formatDatePicker', date.toLocaleDateString('pt-br', {
                year: "numeric",
                month: "numeric",
                day: "numeric"
              })) : ''}
            </DateLabel>
            {show && (
              <DateTimePicker
                value={date || new Date()}
                onChange={(e, dateChange) => {
                  setShow(false)
                  setDate(dateChange || date)
                }}
                minimumDate={new Date()}
                display="default"
              />
            )}
          </ContainerDateTouch>
        </ContainerDate>
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
