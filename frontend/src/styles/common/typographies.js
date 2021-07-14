import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';
import {
    Typography
} from '@material-ui/core';

export const Title = styled(Typography).attrs(props => ({
    component: "h5",
    variant: "h2"
}))`
    font-weight: 400;
    color: ${props => props.theme.palette.text.primary};
`

export const SubTitle = styled(Typography).attrs(props => ({
    component: "h5",
    variant: "h5"
}))`
    font-weight: 500;
    color: ${props => props.theme.palette.text.primary};
`

export const CardTitle = styled(Typography).attrs(props => ({
    component: "h5",
    variant: "h5"
}))`
    font-weight: 600;
    color: ${props => props.theme.palette.text.primary};
`

export const AppBarTitle = styled(Typography).attrs(props => ({
    component: "h6",
    variant: "h6"
}))`
    flex-grow: 1;
`

export const LinkTitle = styled(Link)`
    color: ${props => props.theme.palette.common.white};
`

export const Paragraph = styled(Typography).attrs(props => ({
    component: "p",
    variant: "body1"
}))`

`