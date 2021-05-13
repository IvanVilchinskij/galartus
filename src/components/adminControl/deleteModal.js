import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import axiosInstance from '../../axios';

const DeleteModal = ({isOpen, url, toggle, toggleRefresh, modalId, modalName}) => {
    const handleSubmit = () => {
        axiosInstance.delete(`${url}${modalId}/delete`)
            .catch((err) => {
                if (err.response) {
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				}
            })
            .then(() => {
                toggleRefresh();
                toggle();
            });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Удаление {modalName}</ModalHeader>
            <ModalBody>
                Вы уверены?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Удалить</Button>
                <Button color="secondary" onClick={toggle}>Отмена</Button>
            </ModalFooter>  
        </Modal>
    );
};

export default DeleteModal;