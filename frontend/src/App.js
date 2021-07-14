import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from './contexts/themeContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GlobalStyle from './styles/common/globalstyles';
import NavBar from './components/NavBar/AppBar';
import RegisterPage from './components/Registration/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';

function App() {
  const { currentTheme } = useTheme();

  return (
    <MuiThemeProvider theme={currentTheme}>
      <ThemeProvider theme={currentTheme}>
        <Router>
            <GlobalStyle />
            <NavBar />
            <Route exact path="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
