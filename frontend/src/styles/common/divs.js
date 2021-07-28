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

export const DivClick = styled(Div)`
    align-items: center;
    &:hover {
        background-color: ${props => props.theme.palette.action.hover};
    }
`

export const DivVehicleListItem = styled(Div)`
    border-radius: 12px;
    width: 55rem;
    height: 15rem;
    box-shadow: 0 2px 8px rgb(0 0 0 / 16%);
    padding: 2rem;
`

export const DivVehicleListItemBody = styled(Div)`
    flex-direction: column;
`