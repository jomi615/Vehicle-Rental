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

const ProfileBody = () => {
    return (
        <Body>
            <Title>Hi, I'm blabla</Title>
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