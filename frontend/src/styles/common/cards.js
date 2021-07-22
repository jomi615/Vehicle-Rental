import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const StdCard = styled(Card)`
    box-shadow: 0 2px 8px rgb(0 0 0 / 16%);
    padding: .75rem;
    border-radius: 12px;
    margin: 0 1rem;
    &:hover {
        cursor: pointer;
    }
`