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

const RegisterPage = () => {
    return (
        <Div component="div" m={8} justifyContent="center">
            <Form>
                <Title align="center">Register User</Title>
                <Div>
                    <FormInput label="First Name" variant="outlined" />
                    <FormInput label="Last Name" variant="outlined" />
                </Div>
                <FormInput label="Phone" variant="outlined" />
                <FormInput label="Email" variant="outlined" />
                <FormInput label="Username" variant="outlined" />
                <FormInput label="Password" type="password" variant="outlined" />
                <DivButton>
                    <FormButton>Register</FormButton>
                </DivButton>
            </Form>
        </Div>
    );
}

export default RegisterPage;