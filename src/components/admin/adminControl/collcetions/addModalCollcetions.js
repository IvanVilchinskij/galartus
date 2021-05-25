import React, {useState} from 'react';
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

const AddModalCollcetions = ({isOpen, toggle, setUpdate}) => {
    const initialFormData = Object.freeze({
        name: '',
    });

    const [collectionData, updateCollcetionData] = useState(initialFormData);
    const [collectionImg, setCollectionImg] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [formValid, setFormValid] = useState(true);

    // eslint-disable-next-line eqeqeq

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
        if([target.name] == 'image') {
            setCollectionImg({
                image: target.files,
            });
        }

        updateCollcetionData({
            ...collectionData,
            [target.name]: target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setLoading(true);

        let formData = new FormData();

        if (!collectionImg) {
            setLoading(false);
            setFormValid(false);

            setTimeout(() => setFormValid(true), 5000);
        } else {
            if ((collectionData.name.trim().length !== 0) && (collectionImg.image.length !== 0)) {
                setFormValid(true);

                formData.append('name', collectionData.name);
                formData.append('image', collectionImg.image[0]);

                axiosInstance.post(`categories/create`, formData)
                    .then(() => {
                        setLoading(false);

                        setUpdate();
                        toggle();
                    })
                    .catch(err => {
                        setLoading(false);
                        setError(true);

                        console.log(err);
                    });
            } else {
                setLoading(false);
                setFormValid(false);

                setTimeout(() => setFormValid(true), 5000);
            }    
        }
    };

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;
    const formErrorText = !formValid ? 'Необходимо заполнить все поля' : null;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form id='addCollcetionForm'>
                <ModalHeader toggle={toggle}>Добавление коллекции</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="addName">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="addName"
                            onChange={handleChange}
                            autoComplete='name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleImage">File</Label>
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
                    <Button 
                        color="primary" 
                        onClick={handleSubmit}
                    >
                        Добавить
                    </Button>
                    <Button color="secondary" onClick={toggle}>Отмена</Button>
                    {loadingText}
                    {errorText}
                    {formErrorText}
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default AddModalCollcetions;