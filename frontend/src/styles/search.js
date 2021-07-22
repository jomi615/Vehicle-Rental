import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

export const FormSearch = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 45rem;
    margin: 2rem;
    padding: 1rem 1rem 1rem 2rem;
    box-shadow: ${props => props.theme.shadows[4]};
    border-radius: 50px;
    background-color: ${props => props.theme.palette.background.default};
`

export const SearchButton = styled(IconButton)`
    background-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.common.white};
    &:hover {
        background-color: ${props => props.theme.palette.primary.light};
    }
    margin-left: 1rem;
`