import React from 'react';
import {
    useState
} from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Switch
} from '@material-ui/core';
import {
    BiMenu
} from 'react-icons/bi';
import { useTheme } from '../../contexts/themeContext';

const NavBar = () => {
    const {changeTheme, currentTheme} = useTheme();
    const [checked, setChecked] = useState(false);
    const [isLight, setIsLight] = useState(true);

    const toggleChecked = () => {
        setChecked(!checked);
        setIsLight(!isLight);
        changeTheme(checked);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <BiMenu />
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <FormGroup>
                    <FormControlLabel 
                    control={
                        <Switch checked={checked} onChange={toggleChecked} />
                    }
                    label="Toggle Dark Mode"
                    />
                </FormGroup>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;