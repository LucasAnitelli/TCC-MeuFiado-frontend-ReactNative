import React from 'react';
import { Animated, View, ToastAndroid } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ListProps } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';
import { useMask } from '../../utils/Mask';
import {
  ButtonRemove,
  Container,
  Name,
  Price,
  Product,
  ButtonEdit,
  DateClient,
  ContainerSecondary,
  ContainerNameDate,
  ContainerProductPrice,
} from './styles';

const ListDebtor: React.FC<ListProps> = (props) => {
  const { handleRemove, data, editClick } = props;

  let lastTap = null;
  const handleDoubleTap = () => {
    try {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
        editClick();
      } else {
        lastTap = now;
      }
    } catch {
      ToastAndroid.show(
        'Não foi possivel acessar as alterações desse cliente',
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <ButtonRemove onPress={handleRemove}>
            <Icon name="trash" size={30} color={palette.white} />
          </ButtonRemove>
        </Animated.View>
      )}
    >
      <ButtonEdit onPress={handleDoubleTap} {...props}>
        <Container>
          <ContainerSecondary>
            <ContainerNameDate>
              <Name>{data.nameDebtor}</Name>
              <DateClient>{useMask('date', data.date)}</DateClient>
            </ContainerNameDate>
            <ContainerProductPrice>
              <Product>{data.product}</Product>
              <Price>{useMask('moneymask', data.value)}</Price>
            </ContainerProductPrice>
          </ContainerSecondary>
        </Container>
      </ButtonEdit>
    </Swipeable>
  );
};

export default ListDebtor;
