import { createMuiTheme } from "@material-ui/core";

// const lightTheme = {
//     background: '#ffffff',
//     color: '#000000'
// }

// const darkTheme = {
//     background: '#000000',
//     color: '#ffffff'
// }

// const themes = {
//     light: lightTheme,
//     dark: darkTheme
// }

const themes = createMuiTheme({
    palette: {
        primary: {
            main: '#2596be',
            light: '#66b6d2'
        }
    }
})

export default themes;