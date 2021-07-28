import React from 'react';
import {
    useState,
    useEffect
} from 'react'
import {
    useParams
} from 'react-router-dom';
import {
    Div
} from '../../styles/common/divs';
import {
    Container
} from '@material-ui/core';
import UserVehicleBody from './UserVehicleBody';
import UserVehicleNav from './UserVehicleNav';
import { getAllVehicles } from '../../apis/vehicleApis';

const UserVehiclePage = () => {
    const { category } = useParams();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then((data) => {
            setVehicles(data);
        })
    }, [])

    return (
        <Div m={8}>
            <Container>
                <Div flexDirection="row">
                    <UserVehicleNav category={category} />
                    <UserVehicleBody vehicles={vehicles} />
                </Div>
            </Container>
        </Div>
    );
}

export default UserVehiclePage;