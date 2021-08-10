import React from 'react';
import {
    useRef
} from 'react';
import {
    Div,
    Form,
    DivButton
} from '../../styles/common/divs';
import {
    Title
} from '../../styles/common/typographies';
import {
    FormButton
} from '../../styles/common/buttons';
import {
    InputOutlined,
} from '../../styles/common/inputs';
import { useAuth } from '../../contexts/authContext';
import { useToast } from '../../contexts/toastContext';
import MESSAGE from '../../resources/messages.json';
import SEVERITY from '../../resources/severities.json';

const RegisterPage = () => {
    const fnameRef = useRef();
    const lnameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { registerUser } = useAuth();
    const { dispatch } = useToast();

    const createRegisterReq = () => {
        return {
            fname: fnameRef.current.value,
            lname: lnameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            username: usernameRef.current.value,
            pass: passwordRef.current.value
        }
    }

    const handleAlert = (actionType, actionPayload) => {
        dispatch({type: actionType, payload: actionPayload});
    }

    const handleSubmitRegister = () => {
        let req = createRegisterReq();
        try {
            registerUser(req).then((res) => {
                // handleAlert(SEVERITY.success, res.message);
            }) 
        }
        catch {
            handleAlert(SEVERITY.error, MESSAGE.server_error);
        }
    }

    return (
        <Div component="div" m={8} justifyContent="center">
            <Form>
                <Title align="center">Register User</Title>
                <Div>
                    <InputOutlined inputRef={fnameRef} label="First Name"  />
                    <InputOutlined inputRef={lnameRef} label="Last Name"  />
                </Div>
                <InputOutlined inputRef={phoneRef} label="Phone"  />
                <InputOutlined inputRef={emailRef} label="Email"  />
                <InputOutlined inputRef={usernameRef} label="Username"  />
                <InputOutlined inputRef={passwordRef} label="Password" type="password"  />
                <DivButton>
                    <FormButton onClick={handleSubmitRegister}>Register</FormButton>
                </DivButton>
            </Form>
        </Div>
    );
}

export default RegisterPage;