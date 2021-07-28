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
    FormInput,
} from '../../styles/registration';
import { useAuth } from '../../contexts/authContext';
import { useToast } from '../../contexts/toastContext';
import SEVERITY from '../../resources/severities.json';
import MESSAGE from '../../resources/messages.json';

const LoginPage = () => {
    const usernameRef = useRef();
    const passRef = useRef();
    const { loginUser } = useAuth();
    const { handleAlert } = useToast();

    const createLoginReq = () => {
        return {
            username: usernameRef.current.value,
            pass: passRef.current.value
        }
    }

    const handleSubmitLogin = () => {
        let req = createLoginReq();
        try {
            loginUser(req).then((data) => {
                handleAlert(SEVERITY.success, "success");
            })
        }
        catch {
            handleAlert(SEVERITY.error, MESSAGE.server_error);
        }
    }

    return (
        <Div component="div" m={8} justifyContent="center">
            <Form>
                <Title align="center">Login</Title>
                <FormInput inputRef={usernameRef} label="Username" variant="outlined" />
                <FormInput inputRef={passRef} label="Password" type="password" variant="outlined" />
                <DivButton>
                    <FormButton onClick={handleSubmitLogin}>Log in</FormButton>
                </DivButton>
            </Form>
        </Div>
    );
}

export default LoginPage;