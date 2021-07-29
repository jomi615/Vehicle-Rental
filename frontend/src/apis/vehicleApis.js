import axios from 'axios';
import URL from '../resources/path_config';

export const getAllVehicles = async (req) => {
    try {
        const res = await axios.get(URL.vehicle);
        return res.data;
    }
    catch {
        throw new Error()
    }
}