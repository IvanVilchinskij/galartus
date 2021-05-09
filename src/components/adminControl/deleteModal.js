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

import WithMuseamService from '../hoc/withMuseamService';

const DeleteModal = ({MuseamService, isOpen, url, toggle, toggleRefresh, modalId, modalName}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Удаление {modalName}</ModalHeader>
            <ModalBody>
                Вы уверены?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {
                    MuseamService.deleteItem(url, modalId)
                        .then(res => {
                            toggleRefresh();
                            toggle();
                        });
                }}>Удалить</Button>
                <Button color="secondary" onClick={toggle}>Отмена</Button>
            </ModalFooter>  
        </Modal>
    );
};

export default WithMuseamService()(DeleteModal);