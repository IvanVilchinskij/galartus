import React, { useState} from 'react';
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
import {connect} from 'react-redux';

import axiosInstance from '../../../axios';
import * as actions from '../../../actions/actions';

const EditModalPictures = ({ collections, isLoadingCollections, isErrorCollcetions, isOpen, toggle, modalId, toggleRefresh, modalName}) => {

    const initialFormData = Object.freeze({
        name: '',
        author: '',
        description: '',
    });

    const [pictureData, updatePictureData] = useState(initialFormData);
    const [pictureImg, setPictureImg] = useState(null);

    const handleChange = (e) => {
        const target = e.target;

        if([target.name] == 'image') {
            setPictureImg({
                image: target.files
            });
        }

        updatePictureData({
            ...pictureData,
            [target.name]: target.value.trim()
        });
    };

    const handleSubmit = (formId) => {
        const form = document.querySelector(formId);
        const formData = new FormData(form);

        formData.set('name', pictureData.name);
        formData.set('author', pictureData.author);
        formData.set('description', pictureData.description);
        formData.set('image', pictureImg.image[0]);

        axiosInstance.put(`pictures/${modalId}`)
            .then(() => {
                toggleRefresh();
                toggle();
            });
    };

    const collectionsOptions = collections ? collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    }) : null;

    const loadingContent = isLoadingCollections ? 'Loading' : null;

    const errorContent = isErrorCollcetions ? 'Error' : null;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form id='editPictureForm'>
                <ModalHeader toggle={toggle}>Изменеие {modalName}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="picEditName">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="addEditName"
                            autoComplete='name'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditAuthor">author</Label>
                        <Input 
                            type="text" 
                            name="author" 
                            id="picEditAuthor"
                            autoComplete='author'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditDescription">description</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            id="picEditDescription"
                            autoComplete='description'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditImage">image</Label>
                        <Input 
                            type="file" 
                            name="image" 
                            id="picEditImage"
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='picEditCategories'>Categories</Label>
                        <Input 
                            type="select" 
                            name="categories" 
                            id="picEditCategories"
                            onChange={handleChange}
                            multiple
                        >
                            {loadingContent}
                            {collectionsOptions}  
                            {errorContent}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        handleSubmit('#editPictureForm');
                    }}>Изменить</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        collections: state.collections,
        isLoadingCollections: state.isLoadingCollections,
        isErrorCollcetions: state.isErrorCollcetions
    }
};

export default connect(mapStateToProps, actions)(EditModalPictures);