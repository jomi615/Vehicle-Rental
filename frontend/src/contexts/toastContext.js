import React from 'react';
import {
    useReducer,
    useContext
} from 'react';
import {
    Snackbar
} from '@material-ui/core';
import {
    Alert
} from '../styles/common/alerts';

const ToastContext = React.createContext();

export const useToast = () => {
    return useContext(ToastContext);
}

const defaultToast = () => {
    return {
        isOpened: false,
        severity: "success",
        message: ""
    }
}

const reducer = (toastObj, action) => {
    switch (action.type) {
        case "closeToast":
            return {
                ...toastObj,
                isOpened: false
            }
        default:
            return {
                isOpened: true,
                severity: action.type,
                message: action.payload
            }
    }
}

export const ToastProvider = ({ children }) => {
    const [toast, dispatch] = useReducer(reducer, defaultToast);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({type: "closeToast"});
    };

    const renderToastAlert = () => {
        return (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={toast.isOpened} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={toast.severity} onClose={handleClose}>
                    {toast.message}
                </Alert>
            </Snackbar>
        )
    }

    const value = {
        dispatch,
        renderToastAlert
    }

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    )
}