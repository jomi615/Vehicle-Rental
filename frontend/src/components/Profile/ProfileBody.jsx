import React from 'react';
import {
    Body
} from '../../styles/profile';
import {
    Div
} from '../../styles/common/divs';
import {
    Title,
    SubTitle
} from '../../styles/common/typographies';
import { useAuth } from '../../contexts/authContext';


const ProfileBody = () => {
    const { user } = useAuth();

    return (
        <Body>
            <Title>Hi, I'm {user.lname}</Title>
            <Div>
                <Div>
                    <SubTitle>About</SubTitle>
                </Div>
                <Div></Div>
            </Div>
        </Body>
    );
}
 
export default ProfileBody;