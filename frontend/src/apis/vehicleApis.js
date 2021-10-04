import axios from 'axios';
import URL from '../resources/path_config';

export const getAllVehicles = async () => {
    try {
        const res = await axios.get(URL.vehicle);
        return res.data;
    }
    catch {
        console.log("haha");
    }
}