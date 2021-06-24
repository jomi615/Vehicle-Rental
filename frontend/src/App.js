import logo from './logo.svg';
import './App.css';
import { StyledButton } from './styles/buttons';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from './contexts/themeContext';
import { AppDiv } from './styles/divs';
import { useState } from 'react';
import NavBar from './components/NavBar/AppBar';

function App() {
  const { currentTheme } = useTheme();

  return (
    <MuiThemeProvider theme={currentTheme}>
      <ThemeProvider theme={currentTheme}>
        <AppDiv>
          <NavBar />
          <img src={logo} className="App-logo" alt="logo" />
        </AppDiv>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
