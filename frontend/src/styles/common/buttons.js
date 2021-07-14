import styled from 'styled-components';
import {Button} from '@material-ui/core';

export const FormButton = styled(Button).attrs(props => ({
    variant: "contained",
    color: "secondary"
}))`
    padding: .75rem 1.5rem;
`;