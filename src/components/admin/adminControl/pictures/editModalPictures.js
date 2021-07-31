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

import axiosInstance from '../../../../axios';
import * as actions from '../../../../actions/actions';
import icons from '../../../../icons/icons.svg';

const EditModalPictures = ({ collections, isLoadingCollections, isErrorCollcetions, isOpen, toggle, modalId, toggleRefresh, modalName}) => {

    const initialFormData = Object.freeze({
        name: '',
        author: '',
        description: '',
    });

    const [pictureData, updatePictureData] = useState(initialFormData);
    const [pictureImg, setPictureImg] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
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
        setError(false);
        setLoading(true);

        const form = document.querySelector(formId);
        const formData = new FormData(form);

        let counter = 0;
        const isImage = pictureImg ? pictureImg.image : null;
        const imageLength = isImage ? pictureImg.image.length : 0;

        for (let key in pictureData) {
            if (!pictureData[key]) {
                formData.delete(key);
            }
        }

        if (!pictureImg || !imageLength) {
            formData.delete('image');
        }
        // eslint-disable-next-line 
        for (let [name] of formData.keys()) {
            counter++;
        }

        if (counter === 0) {
            setLoading(false);

            toggle();
        } else {
            axiosInstance.put(`pictures/${modalId}`, formData)
                .then(() => {
                    setLoading(false);

                    toggleRefresh();
                    toggle();
                })
                .catch((err) => {
                    setLoading(false);
                    setError(true);

                    console.log(err);
                });
        }
    };

    const collectionsOptions = collections ? collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    }) : null;

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;

    const loadingContent = isLoadingCollections ? 'Loading' : null;

    const errorContent = isErrorCollcetions ? 'Error' : null;

    const closeBtn = <svg className='close' onClick={toggle}><use href={`${icons}#close`}></use></svg>;

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='custom-modal'>
            <Form id='editPictureForm'>
                <ModalHeader toggle={toggle} close={closeBtn}>Изменеие "{modalName}"</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="picEditName">Название</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="addEditName"
                            autoComplete='name'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditAuthor">Автор</Label>
                        <Input 
                            type="text" 
                            name="author" 
                            id="picEditAuthor"
                            autoComplete='author'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditDescription">Описание</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            id="picEditDescription"
                            autoComplete='description'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditImage">Изображение</Label>
                        <Input 
                            accept='image/*'
                            type="file" 
                            name="image" 
                            id="picEditImage"
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='picEditCategories'>Категории</Label>
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
                    <button disabled onClick={() => {
                        handleSubmit('#editPictureForm');
                    }}>Изменить</button>
                    {loadingText}
                    {errorText}
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