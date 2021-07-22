import React from 'react';
import {
    useParams
} from 'react-router-dom';
import {
    Div
} from '../../styles/common/divs';
import UserVehicleBody from './UserVehicleBody';
import UserVehicleNav from './UserVehicleNav';

const UserVehiclePage = () => {
    const {pagename} = useParams();

    return (
        <Div>
            <UserVehicleNav />
            <UserVehicleBody />
        </Div>
    );
}
 
export default UserVehiclePage;