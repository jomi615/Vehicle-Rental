import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StylesProvider } from '@material-ui/core';
import { ThemeContextProvider } from './contexts/themeContext';
import { AuthProvider } from './contexts/authContext';
import { ToastProvider } from './contexts/toastContext';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <ThemeContextProvider>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
