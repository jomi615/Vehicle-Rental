import React from 'react';
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

const LoginPage = () => {
    return (
        <Div component="div" m={8} justifyContent="center">
            <Form>
                <Title align="center">Login</Title>
                <FormInput label="Username" variant="outlined" />
                <FormInput label="Password" type="password" variant="outlined" />
                <DivButton>
                    <FormButton>Log in</FormButton>
                </DivButton>
            </Form>
        </Div>
    );
}

export default LoginPage;