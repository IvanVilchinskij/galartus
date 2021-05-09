import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import WithMuseamService from '../../hoc/withMuseamService';

const AddModalCollcetions = ({MuseamService, isOpen, toggle, toggleRefresh}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form id='addCollcetionForm'>
                <ModalHeader toggle={toggle}>Добавление коллекции</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="addName">Name</Label>
                        <Input type="text" name="name" id="addName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleImage">File</Label>
                        <Input type="file" name="image" id="exampleImage" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        MuseamService.setItem('#addCollcetionForm', '/categories/create')
                            .then((res) => {
                                toggleRefresh();
                                toggle();
                            });
                    }}>Добавить</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default WithMuseamService()(AddModalCollcetions);