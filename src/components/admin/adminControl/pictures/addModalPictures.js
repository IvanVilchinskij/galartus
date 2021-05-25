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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [validForm, setValidForm] = useState(true);

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

    const checkValidation = (fieldName, value) => {

        switch (fieldName){
            case 'image': 
                if (!value) {
                    setValidForm(false);
                }
                break;
            default:
                if (value.trim().length === 0) {
                    setValidForm(false);
                }
                break;
        }

    };

    const handleSubmit = (formId) => {
        setError(false);
        setLoading(true);

        const form = document.querySelector(formId);
        const formData = new FormData(form);

        setValidForm(true);

        const picturesImgLength = picturesImg ? picturesImg.image.length : null;

        if (!picturesImg || !picturesImgLength || !formData.has('categories')) {
            setLoading(false);
            setValidForm(false); 
    
            setTimeout(() => setValidForm(true), 5000);
        } else {
            formData.set('name', picturesData.name);
            formData.set('author', picturesData.author);
            formData.set('description', picturesData.description);
            formData.set('image', picturesImg.image[0]);

            for (let pair of formData.entries()) {
                checkValidation(pair[0], pair[1]);
            }

            if (validForm) {
                axiosInstance.post('pictures/create', formData)
                .then(() => {
                    setLoading(false);
                    toggleRefresh();
                    toggle();
                })
                .catch(err => {
                    setLoading(false);
                        setError(true);

                        console.log(err);
                });
            } else {
                setLoading(false);

                setTimeout(() => setValidForm(true), 5000);
            }
        }
    };

    const collectionsOptions = collections ? collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    }) : null;

    const loadingContent = isLoadingCollections ? 'Loading' : null;

    const errorContent = isErrorCollcetions ? 'Error' : null;

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;
    const formErrorText = !validForm ? 'Необходимо заполнить все поля' : null;

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
                    <Button 
                        color="secondary" 
                        onClick={toggle}
                    >
                        Cancel
                    </Button>
                    {loadingText}
                    {errorText}
                    {formErrorText}
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