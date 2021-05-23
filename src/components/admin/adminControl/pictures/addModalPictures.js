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
import {connect} from 'react-redux';

import axiosInstance from '../../../../axios';
import * as actions from '../../../../actions/actions';

const AddModalPictures = ({collections, isLoadingCollections, isErrorCollcetions, isOpen, toggle, toggleRefresh}) => {

    const initialFormData = Object.freeze({
        name: '',
        author: '',
        description: '',
        categories: [],
    });

    const [picturesData, updatePicturesData] = useState(initialFormData);
    const [picturesImg, setPicturesImg] = useState(null);

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
        if ([target.name] == 'image') {
            setPicturesImg({
                image: target.files,
            });
        }

        updatePicturesData({
            ...picturesData,
            [target.name]: target.value.trim(),
        });
        
    };

    const handleSubmit = (formId) => {
        const form = document.querySelector(formId);
        const formData = new FormData(form);

        formData.set('name', picturesData.name);
        formData.set('author', picturesData.author);
        formData.set('description', picturesData.description);
        formData.set('image', picturesImg.image[0]);

        axiosInstance.post('pictures/create', formData)
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
            <Form id='addPictureForm'>
                <ModalHeader toggle={toggle}>Добавление картинки</ModalHeader>
                <ModalBody>
                <FormGroup>
                    <Label for="picName">Name</Label>
                    <Input 
                        type="text" 
                        name="name" 
                        id="addName"
                        onChange={handleChange}
                        autoComplete='name'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="picAuthor">author</Label>
                    <Input 
                        type="text" 
                        name="author" 
                        id="picAuthor"
                        onChange={handleChange}
                        autoComplete='author'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="picDescription">description</Label>
                    <Input 
                        type="text" 
                        name="description" 
                        id="picDescription"
                        onChange={handleChange}
                        autoComplete='description'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="picImage">image</Label>
                    <Input 
                        accept='image/*'
                        type="file" 
                        name="image" 
                        id="picImage"
                        onChange={handleChange} 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='picCategories'>Categories</Label>
                    <Input 
                        type="select" 
                        name="categories" 
                        id="picCategories"
                        multiple
                        onChange={handleChange}
                    >
                        {loadingContent}
                        {collectionsOptions} 
                        {errorContent}
                    </Input>
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleSubmit('#addPictureForm')}>Добавить</Button>
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

export default connect(mapStateToProps, actions)(AddModalPictures);