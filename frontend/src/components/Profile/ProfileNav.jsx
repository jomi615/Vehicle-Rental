import React from 'react';
import {
    useState
} from 'react';
import {
    Div
} from '../../styles/common/divs';
import {
    CardTitle,
    Paragraph
} from '../../styles/common/typographies';
import {
    NavCard
} from '../../styles/profile';
import {
    CardContent
} from '@material-ui/core';
import {
    BiChevronRight
} from 'react-icons/bi';
import {
    Link
} from 'react-router-dom';
import NavConfig from './navs.json';

const ProfileNav = () => {
    const [cardContent] = useState(NavConfig);

    return (
        <Div my={6}>
            {cardContent.map((value, key) => {
                return (
                    <NavCard key={key}>
                        <Link to={`/profile/${value.title.toLowerCase()}`}>
                            <CardContent>
                                <Div alignItems="center">
                                    <CardTitle>
                                        {value.title}
                                    </CardTitle>
                                    <BiChevronRight size="2rem" />
                                </Div>
                                <Paragraph>
                                    {value.content}
                                </Paragraph>
                            </CardContent>
                        </Link>
                    </NavCard>
                )
            })}

        </Div>
    );
}

export default ProfileNav;