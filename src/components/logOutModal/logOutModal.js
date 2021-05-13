import React,{ useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';

const LogOutModal = ({isOpenExit, toggleExit, setAutorization}) => {
    const handleSubmit = () => {
        const refreshToken = localStorage.getItem('refresh_token');

        if (refreshToken) {
            axiosInstance.post(`users/logout?refresh_token=${refreshToken}`, {
                refresh_token: refreshToken,
            })
                .then(() => {
                    toggleExit();
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');

                    axiosInstance.defaults.headers['Authorization'] = null;
                    setAutorization(false);
                    window.location.reload();
                });
        } else {
            console.log('NoAutor');
        }
    };

    return (
        <Modal isOpen={isOpenExit} toggle={toggleExit}>
            <ModalHeader toggle={toggleExit}>
                Выход
            </ModalHeader>
            <ModalBody>
                Вы уверены?
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleSubmit} color='primary'>
                    Да, выйти.
                </Button>
                <Button onClick={toggleExit} color='secondary'>Отмена</Button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        isAutorization: state.isAutorization,
    }
};

export default connect(mapStateToProps, actions)(LogOutModal);