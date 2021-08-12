import React, {useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import axiosInstance from '../../../axios';
import icons from '../../../icons/icons.svg';

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

    const closeBtn = <svg className='close' onClick={toggle}><use href={`${icons}#close`}></use></svg>;

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='custom-modal'>
            <ModalHeader toggle={toggle} close={closeBtn}>Удаление</ModalHeader>
            <ModalBody>
                Удалить "{modalName}"?
            </ModalBody>
            <ModalFooter>
                <button disabled onClick={handleSubmit}>Удалить</button>
                {loadingText}
                {errorText}
            </ModalFooter>  
        </Modal>
    );
};

export default DeleteModal;