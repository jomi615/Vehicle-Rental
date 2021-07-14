import React from 'react';
import {
    Div
} from '../../styles/common/divs';
import {
    Container,
    Grid
} from '@material-ui/core';
import ProfileBanner from './ProfileBanner';
import ProfileBody from './ProfileBody';
import ProfileNav from './ProfileNav';

const ProfilePage = () => {
    return (
        <Container>
            <Div m={8} flexWrap="wrap">
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <ProfileBanner />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <ProfileBody />
                    </Grid>
                    <Grid item xs={12}>
                        <ProfileNav />
                    </Grid>
                </Grid>
            </Div>
        </Container>
    );
}
 
export default ProfilePage;