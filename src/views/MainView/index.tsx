import React, { useState } from 'react';
import { FlatList, Alert, ToastAndroid, ActivityIndicator, View } from 'react-native';
import StatusBarD from '../../utils/StatusBarD';
import ListDebtor from './ListDebtor';
import { debtorsDTO } from '../../dto/debtorsDTO';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import Header from '../../components/Header';
import { deleteDebtorController, getPaginationDebtorsController } from '../../controller/debtorsController';
import { ContainerAlert, TextAlert } from './styles';
import palette from '../../theme/palette';
import ButtonFloating from '../../components/ButtonFloating';

const MainView: React.FC = () => {
  StatusBarD('light');

  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [pageScroll, setPageScroll] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [debtorList, setDebtorList] = useState<debtorsDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadDebtors();
    });
    return unsubscribe;
  }, [navigation]);

  const loadDebtors = async () => {
    setLoading(true);
    try {
      const response = await getPaginationDebtorsController(page, 10);
      setPageScroll(1);
      if (response.Success) {
        if (!!response.TotalPages) {
          const pages = response.TotalPages;
          setTotalPages(pages);
        }
        setDebtorList(response.Data);
        setLoading(false);
      } else {
        ToastAndroid.show(
          'Erro ao carregar lista de devedores',
          ToastAndroid.LONG,
        );
        setLoading(false);
      }
    } catch (error) {
      ToastAndroid.show(
        'Erro ao carregar lista de devedores',
        ToastAndroid.LONG,
      );
    }
    setLoading(false);
  }

  const paginationScroll = async () => {
    if (loadingPage) {
      return;
    }
    setLoadingPage(true);
    if (pageScroll < totalPages) {
      setPageScroll(pageScroll + 1);
      try {
        const response = await getPaginationDebtorsController(pageScroll + 1, 10);
        if (response.Success) {
          const list = response.Data;
          setDebtorList([...debtorList, ...list]);
        } else {
          throw new Error('Erro ao carregar lista')
        }
      } catch (error) {
        ToastAndroid.show(
          'Erro ao carregar lista de devedores',
          ToastAndroid.LONG,
        );
      }
    } else {
      ToastAndroid.show('Lista de devedores carregadas', ToastAndroid.LONG);
    }
    setLoadingPage(false);
  };

  const editInfo = (data: debtorsDTO) => {
    navigation.navigate('ChangeView', { data });
  };

  const addInfo = () => {
    navigation.navigate('AddingView');
  };

  const Search = () => {
    navigation.navigate('SearchingView');
  };

  const handleRemove = (itemRemove: debtorsDTO) => {
    Alert.alert('Remover', `Deseja remover ${itemRemove.nameDebtor} ?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const response = await deleteDebtorController(itemRemove.id);
            if (response.Success) {
              const newDebtorList = debtorList.filter(item => item.id !== itemRemove.id)
              setDebtorList(newDebtorList)
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

  const renderFooter = () => {
    return (
      <View>
        {loadingPage ? (
          <ActivityIndicator
            style={{ margin: 15 }}
            color={palette.dark}
            size="large"
          />
        ) : null}
      </View>
    );
  };

  const renderFlatList = () => {
    return (
      <>
        <FlatList
          style={{ marginTop: 8 }}
          data={debtorList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListDebtor
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
              editClick={() => {
                editInfo(item);
              }} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={paginationScroll}
          onEndReachedThreshold={0.4}
          refreshing={false}
          onRefresh={() => {
            loadDebtors();
          }}
          ListFooterComponent={renderFooter} />
        <ButtonFloating
          handleClick={addInfo}
          icon="plus"
          backgroundColor={palette.primary}
          color={palette.white}
        />
      </>
    );
  };

  const renderNotDebtors = () => {
    return (
      <>
        <ContainerAlert>
          <TextAlert>
            Você não tem nenhum devedor, por favor adicionar!!
          </TextAlert>
        </ContainerAlert>
        <ButtonFloating
          handleClick={addInfo}
          icon="plus"
          backgroundColor={palette.primary}
          color={palette.white} />
      </>
    );
  };

  return (
    <>
      <Header title="Meu Fiado" rightClick={Search} />
      {
        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={palette.primary} />
          </View>
          : debtorList.length ? renderFlatList() : renderNotDebtors()
      }
    </>
  );
};

export default MainView;
