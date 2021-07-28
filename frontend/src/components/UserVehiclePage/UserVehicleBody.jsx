import React from 'react';
import {
    Div,
    DivVehicleListItem,
    DivVehicleListItemBody
} from '../../styles/common/divs';
import {
    DivVehicleList
} from '../../styles/profile';
import {
    SectionTitle,
    SubTitle
} from '../../styles/common/typographies';

const UserVehicleBody = (props) => {
    return (
        <DivVehicleList pl={5}>
            {props.vehicles.map((value, key) => {
                return (
                    <DivVehicleListItem key={key}>
                        <Div mr={2}>
                            Image
                        </Div>
                        <DivVehicleListItemBody ml={2}>
                            <SectionTitle>
                                {value.vehicle_name}
                            </SectionTitle>
                            <SubTitle>{value.address}</SubTitle>
                        </DivVehicleListItemBody>
                    </DivVehicleListItem>
                )
            })}
        </DivVehicleList>
    );
}

export default UserVehicleBody;