import React, {useState} from 'react';
import {
    Form,
    ModalBody,
    FormGroup,
    Label,
    Input,
    ModalFooter,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';

import axiosInstance from '../../../axios';
import FormErrors from '../formErrors/formErrors';

const LogIn = ({toggle, setAutorization}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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

    const validateField = (field, input=false) => {
        let fieldName = field.name,
            value = field.value;

        let emailValidate = emailValid,
            passwordValidate = passValid;

        switch (fieldName) {
            case 'email':
                emailValidate = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                setEmailValid(emailValidate);

                if(!input) {
                    setFormErrors({
                        ...formErrors,
                        email: emailValidate ? '' : 'Некорректный адрес',
                    });
                    
                    if (emailValidate) {
                        field.classList.remove('attention');
                    } else {
                        field.classList.add('attention');
                    }
                }
                
                break;
            case 'password': 
                passwordValidate = value.length >= 4;
                setPassValid(passwordValidate);

                if(!input) {
                    setFormErrors({
                        ...formErrors,
                        password:  passwordValidate ? '' : 'Слишком короткий пароль',
                    });

                    if (passValid) {
                        field.classList.remove('attention');
                    } else {
                        field.classList.add('attention');
                    }
                }
                
                break;
            default: 
                break;
        }

        setFormValid(emailValidate && passwordValidate);
    };
    
    const handleInput = (e) => {
        const target = e.target;

        validateField(target, true);

        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        });
    }

    const handleBlur = (e) => {
        const target = e.target;

        validateField(target);

        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);

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

                    setLoading(false);
                    setAutorization(true);
                    toggle();
                })
                .catch((err) => {
                    console.log(err);

                    setLoading(false);
                    setError(true);

                    setTimeout(() => {
                        setError(false);
                    }, 5000);
                });
        }
        
    };

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;

    return (
        <Form>
            <ModalBody>
                <FormGroup>
                    <Input 
                        type='email' 
                        name='email' 
                        id='loginInput'
                        onBlur={handleBlur}
                        onInput={handleInput}
                        autoComplete='email'
                        placeholder='Почта'
                    />
                    <FormErrors typeFor={'email'} formErrors={formErrors}/>
                </FormGroup>
                <FormGroup>
                    <Input 
                        type='password' 
                        name='password' 
                        id='passwordInput'
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onInput={handleInput}
                        placeholder='Пароль'
                    />
                    <FormErrors typeFor={'password'} formErrors={formErrors}/>
                </FormGroup>
                
            </ModalBody>
            <ModalFooter>
                <button 
                        type='submit'
                        onClick={handleSubmit}
                        disabled={!formValid}
                    >
                        Войти
                    </button>
                <span className="error-text" style={{display: `${errorText ? '' : 'none'}`}}>{errorText}</span>
                <span className="loading-text" style={{display: `${loadingText ? '' : 'none'}`}}>{loadingText}</span>
            </ModalFooter>
        </Form>
    );
};

export default LogIn;