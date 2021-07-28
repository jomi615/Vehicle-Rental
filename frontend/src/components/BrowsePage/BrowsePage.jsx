import React from 'react';
import {
    useLocation
} from 'react-router-dom'
import {
    Div
} from '../../styles/common/divs';
import {
    Container
} from '@material-ui/core'
import queryString from 'query-string';
import Searchbar from '../Searchbar/Searchbar';
import BrowseCards from './BrowseCards';


const BrowsePage = () => {
    const location = useLocation();
    const queryObj = queryString.parse(location.search);

    return (
        <Div>
            <Container>
                <Div flexDirection="column">
                    <Div justifyContent="center">
                        <Searchbar vehicleName={queryObj.name} vehicleType={queryObj.type} start={queryObj.start} end={queryObj.end} />
                    </Div>
                    <BrowseCards />
                </Div>
            </Container>
        </Div>
    );
}

export default BrowsePage;