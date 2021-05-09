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

const EditModalCollcetions = ({MuseamService, isOpen, toggle, modalId, toggleRefresh, modalName}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form id='editCollcetionForm'>
                <ModalHeader toggle={toggle}>Изменеие {modalName}</ModalHeader>
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
                        MuseamService.editItem('/categories/','#editCollcetionForm', modalId)
                            .then(res => {
                                toggleRefresh();
                                toggle();
                            });
                    }}>Изменить</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default WithMuseamService()(EditModalCollcetions);