import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import { useTheme } from './contexts/themeContext';
import { useToast } from './contexts/toastContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import GlobalStyle from './resources/globalstyles';
import NavBar from './components/NavBar/AppBar';
import RegisterPage from './components/Registration/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';
import UserVehiclePage from './components/UserVehiclePage/UserVehiclePage';
import BrowsePage from './components/BrowsePage/BrowsePage';

function App() {
  const { currentTheme } = useTheme();
  const { renderToastAlert } = useToast();

  return (
    <MuiThemeProvider theme={currentTheme}>
      <ThemeProvider theme={currentTheme}>
        <Router>
            <GlobalStyle />
            <NavBar />
            {renderToastAlert()}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/profile/:category">
              <UserVehiclePage />
            </Route>
            <Route path="/browse">
              <BrowsePage />
            </Route>
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
