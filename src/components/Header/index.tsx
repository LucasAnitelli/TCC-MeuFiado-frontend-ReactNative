import Menu from '../../components/Menu';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import palette from '../../theme/palette';
import {
  Container,
  IconLeftClick,
  IconRightClick,
  LeftBox,
  RightBox,
  TitleBox,
  TitleHeader,
} from './styles';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = (props) => {
  const { title, leftClick, rightClick } = props;

  return (
    <Container>
      <LeftBox>
        {leftClick ? (
          <IconLeftClick onPress={leftClick}>
            <Icon name="chevron-left" size={20} color={palette.white} />
          </IconLeftClick>
        ) : (
          <Menu />
        )}
        <TitleBox>
          <TitleHeader>{title}</TitleHeader>
        </TitleBox>
      </LeftBox>
      <RightBox>
        {rightClick && (
          <IconRightClick onPress={rightClick}>
            <Icon name="search" size={24} color={palette.white} />
          </IconRightClick>
        )}
      </RightBox>
    </Container>
  );
};

export default Header;
