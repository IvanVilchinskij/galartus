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

const Register = ({toggle, setAutorization}) => {
    const [isValidPass, setIsValidPass] = useState(null);

    const history = useHistory();

    const initialFormData = Object.freeze({
        email: '',
        password: '',
        checkPassword: '',
    });

    const [formErrors, setFormErrors] = useState(initialFormData);

    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const [formData, updateFormData] = useState(initialFormData);

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
        
        setFormValid(passwordValidate && emailValidate);
    };

    const handleChange = (e) => {
        const target = e.target;

        validateField(target.name, target.value);
        // eslint-disable-next-line
        if (target.name == 'checkPassword' && target.value === formData.password) {
            setIsValidPass(true);
            // eslint-disable-next-line
        } else if (target.name == 'checkPassword') {
            setIsValidPass(false);
        }

        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData1 = new FormData();

        if (isValidPass && formValid) {
            formData1.set('email', formData.email);
            formData1.set('password', formData.password);
            formData1.set('is_user', 1);

            axiosInstance.post('users/register', formData1)
                .then(() => {
                    axiosInstance.post('token/', formData1)
                        .then(res => {
                            localStorage.setItem('access_token', res.data.access);
                            localStorage.setItem('refresh_token', res.data.refresh);

                            axiosInstance.defaults.headers['Authorization'] =
                                'Bearer ' + localStorage.getItem('access_token');
                            history.push('/');

                            setAutorization(true);
                            toggle();
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
    };

    const validText = isValidPass === null ? null : isValidPass ? null : <h3>Пароли не совпадают</h3>;

    return (
        <Form>
            <ModalBody>
                <FormGroup>
                    <Label for='registrMail'>Почта</Label>
                    <Input 
                        type='email' 
                        name='email' 
                        id='registrMail'
                        autoComplete='email'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormErrors typeFor={'email'} formErrors={formErrors}/>
                <FormGroup>
                    <Label for='registrPass'>Пароль</Label>
                    <Input 
                        type='password' 
                        name='password' 
                        id='registrPass'
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormErrors typeFor={'password'} formErrors={formErrors}/>
                <FormGroup>
                    <Label for='checkPassword'>Подтвердите пароль</Label>
                    <Input 
                        type='password' 
                        name='checkPassword' 
                        id='checkPassword'
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                </FormGroup>
                {validText}
            </ModalBody>
            <ModalFooter>
                <Button 
                    type='submit'
                    color='primary'
                    onClick={handleSubmit}
                    disabled={!formValid || !isValidPass}
                >
                    Зарегистрироваться
                </Button>
                <Button onClick={toggle} color='secondary'>Отмена</Button>
            </ModalFooter>
        </Form>
    );
};

export default Register;