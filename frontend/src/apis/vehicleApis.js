import axios from 'axios';
import URL from '../resources/path_config';

export const getAllVehicles = async (req) => {
    const res = await axios.get("http://localhost:4000/vehicleAdd");
    return res.data;
}