import { createMuiTheme } from "@material-ui/core";

export const customColors = {
    primary: {
        main: '#2596be',
        light: '#66b6d2'
    },
}

const themes = createMuiTheme({
    palette: {
        type: 'light',
        ...customColors
    }
})

export default themes;