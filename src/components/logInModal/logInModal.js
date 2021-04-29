import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

const LogInModal = ({isOpen, toggle}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form>
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
            </Form>       
        </Modal>
    );
};

export default LogInModal;