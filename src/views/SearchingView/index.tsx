import Header from '../../components/Header';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Keyboard, ToastAndroid, View } from 'react-native';
import StatusBarD from '../../utils/StatusBarD';
import { useNavigation } from '@react-navigation/native';
import { Container, IconClick, Title } from './styles';
import palette from '../../theme/palette';
import Icon from 'react-native-vector-icons/FontAwesome';
import { debtorsDTO } from '../../dto/debtorsDTO';
import ListDebtor from '../MainView/ListDebtor';
import { useEffect } from 'react';
import Input from '../../components/Form/Input';
import { deleteDebtorController, getSearchDebtorController } from '../../controller/debtorsController';

const SearchingView: React.FC = () => {
  StatusBarD('light');
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [list, setList] = useState<debtorsDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) {
      setShowFlatList(false);
      setList([]);
    }
  }, [searchText]);

  const searchList = async (name: string) => {
    if (name === '') {
      ToastAndroid.show(
        'Por favor, preencher o nome!',
        ToastAndroid.LONG,
      );
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    try {
      const response = await getSearchDebtorController(name);
      if (response.Success) {
        setList(response.Data);
        setLoading(false);
      } else {
        ToastAndroid.show(response.Message, ToastAndroid.LONG);
      }
    } catch {
      ToastAndroid.show('Erro ao pesquisar', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  const newStateName = () => {
    searchList(searchText);
    setShowFlatList(true);
  };

  const editInfo = (data: debtorsDTO) => {
    navigation.navigate('ChangeView', { data });
  };

  const renderFooter = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator
            style={{ margin: 15 }}
            color={palette.dark}
            size="large"
          />
        ) : null}
      </View>
    );
  };

  const handleRemove = (item: debtorsDTO) => {
    Alert.alert('Remover', `Deseja remover ${item.nameDebtor} ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const response = await deleteDebtorController(item.id);
            if (response.Success) {
              newStateName();
              ToastAndroid.show('Excluido com sucesso!!', ToastAndroid.LONG);
            } else {
              ToastAndroid.show(response.Message, ToastAndroid.LONG);
            }
          } catch {
            Alert.alert('Não foi possivel remover!');
          }
        },
      },
    ]);
  };

  return (
    <>
      <Header
        title="Pesquisar"
        leftClick={() => {
          navigation.goBack();
        }}
      />
      <Container>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="nome"
            handleChange={(e) => {
              setSearchText(e);
            }}
            value={searchText}
            returnKeyType="search"
            autoCapitalize="words"
          />
        </View>
        <IconClick
          onPress={() => {
            newStateName();
          }}
        >
          <Icon name="search" size={24} color={palette.dark} />
        </IconClick>
      </Container>
      <View style={{ padding: 16 }}>
        <Title>Resultados</Title>
      </View>
      {showFlatList && !!searchText ? (
        <FlatList
          data={list}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListDebtor
              data={item}
              handleRemove={() => { handleRemove(item) }}
              editClick={() => {
                editInfo(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchingView;
