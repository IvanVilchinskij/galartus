import React, {useState} from 'react';
import {
    Form,
    ModalBody,
    FormGroup,
    Label,
    Input,
    ModalFooter,
    Button,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';

import axiosInstance from '../../../axios';
import FormErrors from '../formErrors/formErrors';

const LogIn = ({toggle, setAutorization}) => {
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const history = useHistory();

    const [formData, updateFormData] = useState(initialFormData);

    const [formErrors, setFormErrors] = useState(initialFormData);

    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const validateField = (fieldName, value) => {
        let emailValidate = emailValid;
        let passwordValidate = passValid;

        switch (fieldName) {
            case 'email':
                emailValidate = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                setEmailValid(emailValidate);

                setFormErrors({
                    ...formErrors,
                    email: emailValidate ? ' ' : 'не корректная почта',
                });
                
                break;
            case 'password': 
                passwordValidate = value.length >= 4;
                setPassValid(passwordValidate);

                setFormErrors({
                    ...formErrors,
                    password:  passwordValidate ? ' ' : ' короткий пароль',
                })
                break;
            default: 
                break;
        }

        setFormValid(emailValidate && passwordValidate);
    };

    const handleChange = (e) => {
        const target = e.target;

        validateField(target.name, target.value);

        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formValid) {
            axiosInstance
                .post('token/', {
                    email: formData.email,
                    password: formData.password,
                })
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);

                    axiosInstance.defaults.headers['Authorization'] =
                        'Bearer ' + localStorage.getItem('access_token');
                    history.push('/');

                    setAutorization(true);
                    toggle();
                });
        }
        
    };

    return (
        <Form>
            <ModalBody>
                <FormGroup>
                    <Label for='loginInput'>Почта</Label>
                    <Input 
                        type='email' 
                        name='email' 
                        id='loginInput'
                        onInput={handleChange}
                        autoFocus
                        /* autoComplete='email' */
                    />
                </FormGroup>
                <FormErrors typeFor={'email'} formErrors={formErrors}/>
                <FormGroup>
                    <Label for='passwordInput'>Пароль</Label>
                    <Input 
                        type='password' 
                        name='password' 
                        id='passwordInput'
                        /*  */
                        /* autoComplete="current-password" */
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormErrors typeFor={'password'} formErrors={formErrors}/>
            </ModalBody>
            <ModalFooter>
                <Button 
                    type='submit'
                    color='primary'
                    onClick={handleSubmit}
                    disabled={!formValid}
                >
                    Войти
                </Button>
                <Button onClick={toggle} color='secondary'>Отмена</Button>
            </ModalFooter>
        </Form>
    );
};

export default LogIn;