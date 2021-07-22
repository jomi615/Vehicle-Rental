import React from 'react';
import {
    useLocation
} from 'react-router-dom'
import {
    Div
} from '../../styles/common/divs';
import queryString from 'query-string';
import Searchbar from '../Searchbar/Searchbar';
import BrowseCards from './BrowseCards';


const BrowsePage = () => {
    const location = useLocation();
    const queryObj = queryString.parse(location.search);

    return (
        <Div justifyContent="center">
            <Div flexDirection="column">
                <Searchbar vehicleName={queryObj.name} vehicleType={queryObj.type} start={queryObj.start} end={queryObj.end} />
                <BrowseCards />
            </Div>
        </Div>
    );
}

export default BrowsePage;