import axios from 'axios';
import URL from "../resources/path_config";

export const register = async (req) => {
    const res = await axios.post(URL.register, req);
    return res.data;
}

export const login = async (req) => {
    const res = await axios.post(URL.login, req);
    return res.data;
}

