import React, {useState} from 'react';
import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';

const LogInModal = ({isOpen, toggle, setAutorization}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    const history = useHistory();

    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const initialFormDataReg = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [formDataReg, updateFormDataReg] = useState(initialFormDataReg);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = () => {

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
    };
    
    const handleChangeReg = (e) => {
        updateFormDataReg({
            ...formDataReg,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmitReg = (e) => {
        const formData1 = new FormData();

        formData1.set('email', formDataReg.email);
        formData1.set('password', formDataReg.password);
        /* e.preventDefualt(); */


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
    };
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggleTab('1'); }}
                        >
                            Вход
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggleTab('2'); }}
                        >
                            Регистрация
                        </NavLink>
                    </NavItem>
                </Nav>
            </ModalHeader>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Form noValidate>
                        <ModalBody>
                            <FormGroup>
                                <Label for='loginInput'>Почта</Label>
                                <Input 
                                    type='email' 
                                    name='email' 
                                    id='loginInput'
                                    onChange={handleChange}
                                    autoFocus
                                    autoComplete='email'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='passwordInput'>Пароль</Label>
                                <Input 
                                    type='password' 
                                    name='password' 
                                    id='passwordInput'
                                    autoComplete="current-password"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                color='primary'
                                onClick={handleSubmit}
                            >
                                Войти
                            </Button>
                            <Button onClick={toggle} color='secondary'>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </TabPane>
                <TabPane tabId="2">
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for='registrMail'>Почта</Label>
                                <Input 
                                    required
                                    type='email' 
                                    name='email' 
                                    id='registrMail'
                                    autoComplete='email'
                                    onChange={handleChangeReg}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrPass'>Пароль</Label>
                                <Input 
                                    required
                                    type='password' 
                                    name='password' 
                                    id='registrPass'
                                    autoComplete="current-password"
                                    onChange={handleChangeReg}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                /* type='submit' */
                                color='primary'
                                onClick={handleSubmitReg}
                            >
                                Зарегистрироваться
                            </Button>
                            <Button onClick={toggle} color='secondary'>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </TabPane>
            </TabContent> 
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(LogInModal);