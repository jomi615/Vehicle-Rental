import React from 'react';
import {
    useState
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    Div
} from '../../styles/common/divs';
import {
    VehicleCard
} from '../../styles/search';
import {
    Paragraph,
    SectionTitle
} from '../../styles/common/typographies';
import {
    CardContent,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@material-ui/core';

const BrowseCards = () => {
    const [sort, setSort] = useState();

    const handleChangeSort = (e) => {
        setSort(e.target.value);
    }

    return (
        <Div flexDirection="column">
            <Div m={2}>
                <FormControl variant="outlined">
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        id="sort-by"
                        onChange={handleChangeSort}
                        label="Sort by"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Div>
            <Div my={4}>
                <VehicleCard>
                    <Link>
                        <CardContent>
                            <Div alignItems="center">
                                <SectionTitle>
                                    t
                                </SectionTitle>
                            </Div>
                            <Paragraph>
                                p
                            </Paragraph>
                        </CardContent>
                    </Link>
                </VehicleCard>
            </Div>
        </Div>
    );
}

export default BrowseCards;