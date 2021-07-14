import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const Div = styled(Box)`
    display: flex;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    box-shadow: ${props => props.theme.shadows[3]};
    padding: 4rem;
    background-color: ${props => props.theme.palette.background.paper};
    min-width: 484px;
`

export const DivButton = styled(Div)`
    justify-content: center;
    margin: 1.5rem;
`