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
        register(req).then((res) => {
            setUser(res.results[0])
            return res
        })
    }

    const loginUser = async (req) => {
        const res = await login(req);
        setUser(res.results[0]);
        return res;
    }

    const logoutUser = async (req) => {
        setUser(null);
    }

    const value = {
        user,
        registerUser,
        loginUser,
        logoutUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}