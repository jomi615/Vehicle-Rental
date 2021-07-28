import React from 'react';
import {
    useState
} from 'react';
import {
    Link
} from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    IconButton,
    FormGroup,
    FormControlLabel,
    Switch,
    Container,
    Menu,
    MenuItem,
} from '@material-ui/core';
import {
    BiMenu,
    BiUserCircle
} from 'react-icons/bi';
import {
    AppBarTitle,
    LinkTitle,
    BoldLink
} from '../../styles/common/typographies';
import {
    Div
} from '../../styles/common/divs';
import { useTheme } from '../../contexts/themeContext';
import { useAuth } from '../../contexts/authContext';
import NavConfig from '../../resources/navs.json';

const NavBar = () => {
    const { currentTheme, dispatch } = useTheme();
    const [checked, setChecked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logoutUser } = useAuth();
    const isOpened = Boolean(anchorEl);

    const changeTheme = () => {
        setChecked(!checked);
        dispatch({ type: 'changeTheme', payload: currentTheme.palette.type === 'light' ? 'dark' : 'light' })
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleMainMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClickLogout = () => {
        logoutUser();
    }

    const renderMenuItems = () => {
        return (
            <Div flexDirection="column">
                {!user ?
                    <>
                        <MenuItem>
                            <Link to="/login">Log in</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/register">Sign up</Link>
                        </MenuItem>
                    </>
                    :
                    <>
                        <MenuItem>
                            <Link to="/profile">Profile</Link>
                        </MenuItem>
                        {NavConfig.map((value, key) => {
                            return (
                                <MenuItem key={key}>
                                    <Link to={`/profile/${value.title.toLowerCase()}`}>
                                        {value.title}
                                    </Link>
                                </MenuItem>
                            )
                        })}
                        <MenuItem>
                            <BoldLink onClick={handleClickLogout}>Log out</BoldLink>
                        </MenuItem>
                    </>

                }

                <MenuItem>
                    <FormGroup>
                        <FormControlLabel
                            label="Dark Mode"
                            control={
                                <Switch checked={checked} onChange={changeTheme} />
                            }
                        />
                    </FormGroup>
                </MenuItem>
            </Div>
        )
    }

    const renderMenu = () => {
        return (
            <Menu
                id="main-menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isOpened}
                onClose={handleCloseMenu}
            >
                {renderMenuItems()}
            </Menu>
        )
    }

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <BiMenu />
                    </IconButton>
                    <AppBarTitle>
                        <LinkTitle to="/">News</LinkTitle>
                    </AppBarTitle>

                    <IconButton color="inherit" aria-label="user" aria-controls="main-menu" aria-haspopup="true" onClick={handleMainMenu}>
                        <BiUserCircle />
                    </IconButton>
                    {user && user.username}
                    {renderMenu()}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;