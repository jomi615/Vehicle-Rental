import React from 'react';
import {
    useContext,
    useState
} from 'react';
import {
    register,
    login
} from '../apis/userAPIs';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();

    const registerUser = async (req) => {
        const res = await register(req);
        return res;
    }

    const loginUser = async (req) => {
        const res = await login(req);
        return res;
    }

    const value = {
        user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}