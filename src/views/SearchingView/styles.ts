import Typography from '../../components/Typography';
import styled from 'styled-components/native';
import palette from '../../theme/palette';

export const Title = styled(Typography).attrs({
    size: 20,
    color: palette.dark,
  })` font-weight: bold`;

  export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0px 16px 0px 16px;
  `;

  export const IconClick = styled.TouchableOpacity``;

