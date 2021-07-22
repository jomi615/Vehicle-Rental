import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.palette.background.paper};
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.palette.text.primary};
    }
`

export default GlobalStyle;