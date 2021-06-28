import React from 'react';
import {
    useState,
    useContext
} from 'react';
import { ThemeContext } from 'styled-components';
import themes from '../styles/themes';

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const ThemeContextProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState(themes['light']);

    const changeTheme = (toggled) => {
        if (toggled) {
            return setCurrentTheme(themes['light']);
        }
        return setCurrentTheme(themes['dark']);
    }

    const value = {
        currentTheme,
        changeTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}