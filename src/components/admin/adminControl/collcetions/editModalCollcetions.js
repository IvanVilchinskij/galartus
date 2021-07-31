import React, { useState } from 'react';
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

import axiosInstance from '../../../../axios';
import icons from '../../../../icons/icons.svg';

const EditModalCollcetions = ({ isOpen, toggle, modalId, modalName, setUpdate}) => {
    const initialFormData = Object.freeze({
        name: '',
    });

    const [collectionData, updateCollectionData] = useState(initialFormData);
    const [formImg, setFormImg] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
        if ([target.name] == 'image') {
            setFormImg({
                image: target.files,
            })
        }

        updateCollectionData({
            ...collectionData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = () => {
        setError(false);
        setLoading(true);

        const formData = new FormData();
        
        const isImage = formImg ? formImg.image : null;
        const imageLength = isImage ? formImg.image.length : 0;
        let counter = 0;

        for (let key in collectionData) {
            if(collectionData[key]) {
                formData.append(key, collectionData[key]);
            }
        }

        if (formImg && imageLength) {
            formData.append('image', formImg.image[0]);
        }
        // eslint-disable-next-line 
        for (let [name] of formData.keys()) {
            counter++;
        }

        if (counter === 0) {
            setLoading(false);

            toggle();
        } else {
            axiosInstance.put(`categories/${modalId}`, formData)
                .then(() => {
                    setLoading(false);

                    setUpdate();
                    toggle();
                })
                .catch((err) => {
                    setLoading(false);
                    setError(true);

                    console.log(err);
                });
        }     
    };

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;

    const closeBtn = <svg className='close' onClick={toggle}><use href={`${icons}#close`}></use></svg>;

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='custom-modal'>
            <Form id='editCollcetionForm'>
                <ModalHeader toggle={toggle} close={closeBtn}>Изменеие "{modalName}"</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="addName">Название</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="addName"
                            autoComplete='name'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleImage">Изображение</Label>
                        <Input 
                            accept='image/*'
                            type="file" 
                            name="image" 
                            id="exampleImage" 
                            onChange={handleChange}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <button disabled onClick={handleSubmit}>Изменить</button>
                    {loadingText}
                    {errorText}
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default EditModalCollcetions;