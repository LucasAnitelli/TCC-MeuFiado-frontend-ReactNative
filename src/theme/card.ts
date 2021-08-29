import palette from "./palette";
import styled from 'styled-components/native';

export const Card = styled.View.attrs({
    shadowColor: palette.dark,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
})`
    background-color: ${palette.white};
    border-radius: 4px;
`