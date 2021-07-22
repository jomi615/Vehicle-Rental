import React from 'react';
import {
    useContext,
    useReducer
} from 'react';
import { ThemeContext } from 'styled-components';
import themes, {customColors} from '../resources/themes';
import { createMuiTheme } from "@material-ui/core";


export const useTheme = () => {
    return useContext(ThemeContext);
}

const reducer = (theme, action) => {
    switch(action.type) {
        case 'changeTheme':
            return createMuiTheme({
                ...theme,
                palette: {
                    type: action.payload,
                    ...customColors
                }
            })
        default:
            throw new Error();
    }
}

export const ThemeContextProvider = ({children}) => {
    const [currentTheme, dispatch] = useReducer(reducer, themes);

    const value = {
        currentTheme,
        dispatch
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}