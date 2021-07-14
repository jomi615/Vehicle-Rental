import styled from 'styled-components';
import {
    Div
} from './common/divs';
import {
    Avatar,
    Card
} from '@material-ui/core';

export const Banner = styled(Div)`
    flex-direction: column;
    border: 1px solid ${props => props.theme.palette.divider};
    border-radius: 12px;
    height: auto;
    max-width: 16rem;
    padding: 1.5rem;
    background-color: ${props => props.theme.palette.background.paper};
`

export const ImageDiv = styled(Div)`
    margin: 0 5rem 2rem 5rem;
    flex-direction: column;
    align-items: center;
`

export const Body = styled(Div)`
    flex-direction: column;
`

export const UserAvatar = styled(Avatar)`
    width: 10rem;
    height: 10rem;
`

export const NavCard = styled(Card)`
    box-shadow: 0 2px 8px rgb(0 0 0 / 16%);
    padding: .75rem;
    border-radius: 12px;
    margin: 0 1rem;
    &:hover {
        cursor: pointer;
    }
`