import styled from 'styled-components';
import {Button} from '@material-ui/core';

export const StyledButton = styled(Button)`
    color: ${props => props.theme.palette.primary.main};
`;