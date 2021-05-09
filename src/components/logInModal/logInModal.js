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
import classnames from 'classnames';

const LogInModal = ({isOpen, toggle}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    
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
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for='loginInput'>Логин</Label>
                                <Input type='text' name='login' id='loginInput'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='passwordInput'>Пароль</Label>
                                <Input type='password' name='password' id='passwordInput'/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary'>Войти</Button>
                            <Button onClick={toggle} color='secondary'>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </TabPane>
                <TabPane tabId="2">
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for='registrFirstName'>Имя</Label>
                                <Input type='text' name='first_name' id='registrFirstName'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrLastName'>Фамилия</Label>
                                <Input type='text' name='last_name' id='registrLastName'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrNikName'>Ник</Label>
                                <Input type='text' name='user_name' id='registrNikName'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrBirthday'>День Рождения</Label>
                                <Input type='date' name='birthday' id='registrBirthday'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrAvatar'>Ваша фотография</Label>
                                <Input type='file' name='image' id='registrAvatar'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrMail'>Почта</Label>
                                <Input type='email' name='email' id='registrMail'/>
                            </FormGroup>
                            <FormGroup>
                                <Label for='registrPass'>Пароль</Label>
                                <Input type='password' name='password' id='registrPass'/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='primary'>Зарегистрироваться</Button>
                            <Button onClick={toggle} color='secondary'>Отмена</Button>
                        </ModalFooter>
                    </Form>
                </TabPane>
            </TabContent> 
        </Modal>
    );
};

export default LogInModal;

/* <Form>
                <ModalHeader toggle={toggle}>
                    Вход
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='loginInput'>Логин</Label>
                        <Input type='text' name='login' id='loginInput'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='passwordInput'>Пароль</Label>
                        <Input type='password' name='password' id='passwordInput'/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary'>Войти</Button>
                    <Button onClick={toggle} color='secondary'>Отмена</Button>
                </ModalFooter>
            </Form>  */