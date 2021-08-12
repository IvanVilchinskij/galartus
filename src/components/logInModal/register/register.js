import React, {useState} from 'react';
import {
    Form,
    ModalBody,
    FormGroup,
    Input,
    ModalFooter,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';

import axiosInstance from '../../../axios';
import FormErrors from '../formErrors/formErrors';

const Register = ({toggle, setAutorization}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
        
        setFormValid(passwordValidate && emailValidate);
    };

    const handleInput = (e) => {
        const target = e.target;

        validateField(target, true);
        // eslint-disable-next-line
        if (target.name == 'checkPassword' && target.value === formData.password) {
            setIsValidPass(true);
            target.classList.remove('attention');
            // eslint-disable-next-line
        } else if (target.name == 'checkPassword') {
            setIsValidPass(false);
            target.classList.add('attention');
        }

        updateFormData({
            ...formData,
            [target.name]: target.value.trim(),
        });
    };

    const handleBlur = (e) => {
        const target = e.target;

        validateField(target);
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

        setError(false);
        setLoading(true);

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

                            setLoading(false);
                            setAutorization(true);
                            toggle();
                        })
                        .catch(err => {
                            console.log(err);
                            setLoading(false);
                            setError(true);
                        });
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setError(true);

                    setTimeout(() => {
                        setError(false);
                    }, 5000);
                });
        }
    };

    const validText = isValidPass === null ? null : isValidPass ? null : <div className='form-errors'>Пароли не совпадают</div>;

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;

    return (
        <Form>
            <ModalBody>
                <FormGroup>
                    <Input 
                        type='email' 
                        name='email' 
                        id='registrMail'
                        autoComplete='email'
                        onBlur={handleBlur}
                        onInput={handleInput}
                        placeholder='Почта'
                    />
                    <FormErrors typeFor={'email'} formErrors={formErrors}/>
                </FormGroup>  
                <FormGroup>
                    <Input 
                        type='password' 
                        name='password' 
                        id='registrPass'
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onInput={handleInput}
                        placeholder='Пароль'
                    />
                    <FormErrors typeFor={'password'} formErrors={formErrors}/>
                </FormGroup>          
                <FormGroup>
                    <Input 
                        type='password' 
                        name='checkPassword' 
                        id='checkPassword'
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onInput={handleInput}
                        placeholder='Подтвердите пароль'
                    />
                    {validText}
                </FormGroup>    
            </ModalBody>
            <ModalFooter>
                <button 
                    type='submit'
                    onClick={handleSubmit}
                    disabled={!formValid || !isValidPass}
                >
                    Зарегистрироваться
                </button>
                <span className="error-text" style={{display: `${errorText ? '' : 'none'}`}}>{errorText}</span>
                <span className="loading-text" style={{display: `${loadingText ? '' : 'none'}`}}>{loadingText}</span>
            </ModalFooter>
        </Form>
    );
};

export default Register;