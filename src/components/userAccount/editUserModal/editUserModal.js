import React, { useState } from 'react';
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
} from 'reactstrap';

import axiosInstance from '../../../axios';

const EditUserModal = ({toggle, isOpen, userId, refresh}) => {
    const initialFormData = Object.freeze({
        first_name: '',
        lastNameEdit: '',
        birthday: '',
    });

    const [editData, updateEditData] = useState(initialFormData);
    const [editImg, setEditImg] = useState(null)

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
        if ([target.name] == 'image') {
            setEditImg({
                image: target.files,
            });
        }

        updateEditData({
            ...editData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = () => {
        const formData = new FormData();
        let counter = 0;

        for (let key in editData) {
            if (editData[key]) {
                formData.append(key, editData[key]);
            }
        }

        if (editImg &&!(editImg.image.length === 0)) {
            formData.append('image', editImg.image[0]);
        }

        for (let [name] of formData.keys()) {
            counter++;
        }
        
        if (counter === 0) {
            toggle();
        } else {
            axiosInstance.put(`users/${userId}`, formData)
                .then(() => {
                    refresh();
                    toggle();
                });
        }

        
    };

    return (
        <Modal toggle={toggle} isOpen={isOpen}>
            <ModalHeader toggle={toggle}>
                Редактирование личных данных
            </ModalHeader>
            <Form>
                <ModalBody>
                    <FormGroup>
                        <Label for='firstNameEdit'>Имя</Label>
                        <Input 
                            type='text'
                            name='first_name'
                            id='firstNameEdit'
                            autoComplete='first_name'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastNameEdit'>Фамилия</Label>
                        <Input 
                            type='text'
                            name='last_name'
                            id='lastNameEdit'
                            autoComplete='last_name'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='birthdayEdit'>День рождения</Label>
                        <Input 
                            type='date'
                            name='birthday'
                            id='birthdayEdit'
                            autoComplete='birthday'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='imageEdit'>Фотография</Label>
                        <Input 
                            id='imageEdit'
                            accept='image/*'
                            type='file'
                            name='image'
                            onChange={handleChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        onClick={handleSubmit}
                    >
                        Сохранить изменеия
                    </Button>
                    <Button
                        color='secondary'
                        onClick={toggle}
                    >
                        Отмена
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditUserModal;