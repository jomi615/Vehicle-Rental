import React from 'react';
import {
    Link
} from 'react-router-dom';
import {
    DivClick
} from '../../styles/common/divs';
import {
    SectionTitle
} from '../../styles/common/typographies';
import NavConfig from '../../resources/navs.json';
import { UserVehicleNavDiv } from '../../styles/profile';
import {
    BiChevronRight
} from 'react-icons/bi';

const UserVehicleNav = (props) => {
    

    return (
        <UserVehicleNavDiv flexDirection="column">
            {NavConfig.map((value, key) => {
                return (
                    <Link key={key} to={`/profile/${value.title.toLowerCase()}`}>
                        <DivClick p={2} width="170px">
                            <SectionTitle>
                                {value.title}
                            </SectionTitle>
                            {props.category === value.title.toLowerCase() && 
                                <BiChevronRight size="2rem" />
                            }
                        </DivClick>
                    </Link>

                )
            })}
        </UserVehicleNavDiv>
    );
}

export default UserVehicleNav;