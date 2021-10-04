import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Div,
    DivVehicleListItem,
    DivVehicleListItemBody
} from '../../styles/common/divs';
import {
    DivVehicleList
} from '../../styles/profile';
import {
    CardTitle,
    SubTitle,
    Price,
    PriceSuffix
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
                            <CardTitle>
                                {value.vehicle_name}
                            </CardTitle>
                            <SubTitle>{value.address}</SubTitle>
                            <Div alignItems="flex-end" flexGrow="1" justifyContent="flex-end">
                                <Div></Div>
                                <Div alignItems="center">
                                    <Price>{value.price}đ</Price>
                                    <Div ml={1}>
                                        <PriceSuffix>/ day</PriceSuffix>
                                    </Div>
                                </Div>
                            </Div>
                        </DivVehicleListItemBody>
                    </DivVehicleListItem>
                )
            })}
        </DivVehicleList>
    );
}

export default UserVehicleBody;