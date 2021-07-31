import React, {/* useEffect, */ useState} from 'react';
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

const EditModalExhibitions = ({collections,  isLoadingCollections, isErrorCollcetions, isOpen, toggle, modalId,  modalName, setUpdate}) => {
    const initialFormData = Object.freeze({
        name: '',
        description: '',
        date: '',
        time: '',
        price: '',
        address: '',
        weekday: '',
        categories: [],
    });

    const [exhibitionData, updateExhibitionData] = useState(initialFormData);
    const [exhibitionImg, setExhibitionImg] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        const target = e.target;
        
        // eslint-disable-next-line 
        if([target.name] == 'image') {
            setExhibitionImg({
                image: target.files
            });
        }

        if ([target.value] == 'weekday') {
            updateExhibitionData({
                ...exhibitionData,
                [target.name]: +target.value.trim()
            })
        }

        console.log(target.value);
        console.log(typeof target.value);

        updateExhibitionData({
            ...exhibitionData,
            [target.name]: target.value.trim()
        });
    };

    const handleSubmit = (formId) => {
        setError(false);
        setLoading(true);

        const form = document.querySelector(formId);
        const formData = new FormData(form);

        let counter = 0;
        const isImage = exhibitionImg ? exhibitionImg.image : null;
        const imageLength = isImage ? exhibitionImg.image.length : 0;

        for (let key in exhibitionData) {

            if (!exhibitionData[key]) {
                formData.delete(key);
            }
        }

        if (!exhibitionImg || !imageLength) {
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
            axiosInstance.put(`exhibitions/${modalId}`, formData)
                .then(() => {
                    setUpdate();
                    setLoading(false);

                    toggle();
                })
                .catch(err => {
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
            <Form id='editExhibitionsForm'>
                <ModalHeader toggle={toggle} close={closeBtn}>Изменеие "{modalName}"</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exhEditName">Название</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="exhEditName"
                            onChange={handleChange}
                            autoComplete='name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditDescription">Описание</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            id="exhEditDescription"
                            onChange={handleChange}
                            autoComplete='description'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditImage">Изображение</Label>
                        <Input 
                            accept='image/*'
                            type="file" 
                            name="image" 
                            id="exhEditImage" 
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditDate">Дата</Label>
                        <Input 
                            accept='image/*'
                            type="date" 
                            name="date" 
                            id="exhEditDate"
                            onChange={handleChange}
                            autoComplete='date'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditTime">Время</Label>
                        <Input 
                            type="time" 
                            name="time" 
                            id="exhEditTime"
                            onChange={handleChange}
                            autoComplete='time'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditPrice">Цена</Label>
                        <Input 
                            type="number" 
                            name="price" 
                            id="exhEditPrice"
                            onChange={handleChange}
                            autoComplete='price'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditAddr">Адрес</Label>
                        <Input 
                            type="text" 
                            name="address" 
                            id="exhEditAddr"
                            onChange={handleChange}
                            autoComplete='address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='exhEditCategories'>Категории</Label>
                        <Input 
                            type="select" 
                            name="categories" 
                            id="exhEditCategories"
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
                        handleSubmit('#editExhibitionsForm');
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


export default connect(mapStateToProps, actions)(EditModalExhibitions);