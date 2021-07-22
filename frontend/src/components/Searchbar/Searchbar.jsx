import React from 'react';
import {
    useState,
    useRef
} from 'react';
import {
    useHistory
} from 'react-router-dom'
import {
    Div
} from '../../styles/common/divs';
import {
    FormSearch,
    SearchButton
} from '../../styles/search';
import {
    InputStd
} from '../../styles/common/inputs';
import {
    BiSearch
} from 'react-icons/bi';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const Searchbar = (props) => {
    const history = useHistory();
    const vehicleName = useRef();
    const vehicleType = useRef();
    const [vehicleTypes] = useState(["Cars", "Motorbikes", "Bicycles"]);
    const [suggestions, setSuggestions] = useState([]);
    const [startDate, setStartDate] = useState(props.start ? props.start : new Date());
    const [endDate, setEndDate] = useState(props.end ? props.end : new Date());

    const handleStartDate = (date) => {
        setStartDate(date);
    }

    const handleEndDate = (date) => {
        setEndDate(date);
    }

    const handleClickSearch = () => {
        let vehName = vehicleName.current.value;
        let vehType = vehicleType.current.value;
        history.push(`/browse?name=${vehName}&start=${startDate}&end=${endDate}&type=${vehType}`);
    }

    return (
        <Div>
            <FormSearch>
                <Autocomplete
                    freeSolo
                    disableClearable
                    id="search-location"
                    options={suggestions.map((option) => option)}
                    fullWidth={true}
                    renderInput={(params) => (
                        <InputStd
                            {...params}
                            inputRef={vehicleName}
                            label="Search..."
                            // value={props.vehicleName}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disablePast
                        disableToolbar
                        fullWidth={true}
                        value={startDate}
                        variant="inline"
                        format="DD/MM/yyyy"
                        id="start-date"
                        label="Start date"
                        onChange={handleStartDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disablePast
                        disableToolbar
                        fullWidth={true}
                        value={endDate}
                        variant="inline"
                        format="DD/MM/yyyy"
                        id="end-date"
                        label="End date"
                        onChange={handleEndDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <Autocomplete
                    id="vehicle-types"
                    disableClearable
                    options={vehicleTypes.map((option) => option)}
                    fullWidth={true}
                    renderInput={(params) => (
                        <InputStd
                            {...params}
                            inputRef={vehicleType}
                            label="Vehicle type"
                            InputProps={{ ...params.InputProps, type: 'text' }}
                        />
                    )}
                />
                <Div>
                    <SearchButton onClick={handleClickSearch}>
                        <BiSearch />
                    </SearchButton>
                </Div>
            </FormSearch>
        </Div>
    );
}

export default Searchbar;