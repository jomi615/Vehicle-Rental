import React from 'react';
import {
    useState,
    useEffect
} from 'react';
import {
    Banner,
    UserAvatar,
    ImageDiv 
} from '../../styles/profile';
import {
    Div
} from '../../styles/common/divs';
import {
    Divider,
    Badge
} from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import {
    FaStar
} from 'react-icons/fa';
import BlankUser from '../../images/blankuser.png';

const ProfileBanner = () => {
    const [stars, setStars] = useState(Array(5).fill(5));
     
    return (
        <Banner>
            <ImageDiv>
                <Badge color="secondary" badgeContent="+">
                    <UserAvatar alt="..." src={BlankUser} />
                </Badge>
            </ImageDiv>
            <Div justifyContent="center" my={3}>
                {stars.map((value, key)=> {
                    return(
                        <FaStar key={key} size="1.5rem" color={yellow[700]} />
                    )
                })}
            </Div>
            <Divider variant="middle" />
            <Div my={3}>
                balbabla...
            </Div>
            <Divider variant="middle" />
            <Div my={3}>

            </Div>
        </Banner>
    );
}
 
export default ProfileBanner;