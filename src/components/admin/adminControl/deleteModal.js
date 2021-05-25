import React, {useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import axiosInstance from '../../../axios';

const DeleteModal = ({isOpen, url, toggle, modalId, modalName, setUpdate, toggleRefresh}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        setError(false);
        setLoading(true);

        axiosInstance.delete(`${url}${modalId}/delete`)
            .then(() => {
                setLoading(false);

                if (setUpdate) {
                    setUpdate();
                }
        
                if (toggleRefresh) {
                    toggleRefresh();
                }

                toggle();
            })
            .catch((err) => {
                setLoading(false);
                setError(true);

                if (err.response) {
					console.log(err.response.data);
					console.log(err.response.status);
					console.log(err.response.headers);
				}
            });
            
    };

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Удаление {modalName}</ModalHeader>
            <ModalBody>
                Вы уверены?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Удалить</Button>
                <Button color="secondary" onClick={toggle}>Отмена</Button>
                {loadingText}
                {errorText}
            </ModalFooter>  
        </Modal>
    );
};

export default DeleteModal;