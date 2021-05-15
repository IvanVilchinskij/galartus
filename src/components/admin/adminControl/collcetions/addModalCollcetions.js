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

const AddModalCollcetions = ({isOpen, toggle, toggleRefresh}) => {
    const initialFormData = Object.freeze({
        name: '',
    });

    const [collectionData, updateCollcetionData] = useState(initialFormData);
    const [collectionImg, setCollectionImg] = useState(null);

    const handleChange = (e) => {
        const target = e.target;
        if([target.name] == 'image') {
            setCollectionImg({
                image: target.files,
            });
        }

        if([target.name] == 'name') {
            updateCollcetionData({
                ...collectionData,
                [target.name]: target.value.trim(),
            });
        }
    };

    const handleSubmit = () => {

        let formData = new FormData();
        
        formData.append('name', collectionData.name);
        formData.append('image', collectionImg.image[0]);

        axiosInstance.post(`categories/create`, formData)
            .then(() => {
                toggleRefresh();
                toggle();
            });
    };

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
                </ModalFooter>
            </Form>
        </Modal>
    );
};

export default AddModalCollcetions;