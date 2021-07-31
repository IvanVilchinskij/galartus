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
import icons from '../../../../icons/icons.svg';

const AddModalExhibitions = ({collections, isLoadingCollections, isErrorCollcetions, isOpen, toggle,  setUpdate}) => {
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

    const [validForm, setValidForm] = useState(true);

    const handleChange = (e) => {
        const target = e.target;
        // eslint-disable-next-line 
        if ([target.name] == 'image') {
            setExhibitionImg({
                image: target.files,
            });
        }

        updateExhibitionData({
            ...exhibitionData,
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

        const form = document.querySelector(formId)
        const formData = new FormData(form);

        setValidForm(true);

        const exhibitionImgLength = exhibitionImg ? exhibitionImg.image.length : null;

        if (!exhibitionImg  || !exhibitionImgLength || !formData.has('categories')) {
            setLoading(false);
            setValidForm(false); 
    
            setTimeout(() => setValidForm(true), 5000);
        } else {
            formData.set('name', exhibitionData.name);
            formData.set('description', exhibitionData.description);
            formData.set('image', exhibitionImg.image[0]);
            formData.set('date', exhibitionData.date);
            formData.set('time', exhibitionData.time);
            formData.set('price', exhibitionData.price);
            formData.set('address', exhibitionData.address);
            formData.set('weekday', exhibitionData.weekday);

            for (let pair of formData.entries()) {
                checkValidation(pair[0], pair[1]);
            } 

            if (validForm) {
                axiosInstance.post('exhibitions/create', formData)
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
                setTimeout(() => setValidForm(true), 5000);
            }
        }        
    };

    const collectionsOptions = collections.length !== 0 ?  collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    }) : null;

    const loadingContent = isLoadingCollections ? 'Loading' : null;

    const errorContent = isErrorCollcetions ? 'Error' : null;

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;
    const formErrorText = !validForm ? 'Необходимо заполнить все поля' : null;

    const closeBtn = <svg className='close' onClick={toggle}><use href={`${icons}#close`}></use></svg>;

    return (
        <Modal isOpen={isOpen} toggle={toggle} className='custom-modal'>
            <Form id='addExhibitionsForm'>
                <ModalHeader toggle={toggle} close={closeBtn}>Добавление выставки</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exhName">Название</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="exhName"
                            onChange={handleChange}
                            autoComplete='name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDescription">Описание</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            id="exhDescription"
                            onChange={handleChange}
                            autoComplete='description'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhImage">Изображение</Label>
                        <Input 
                            accept='image/*'
                            type="file" 
                            name="image" 
                            id="exhImage" 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDate">Дата</Label>
                        <Input 
                            type="date" 
                            name="date" 
                            id="exhDate"
                            onChange={handleChange}
                            autoComplete='date'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhTime">Время</Label>
                        <Input 
                            type="time" 
                            name="time" 
                            id="exhTime"
                            onChange={handleChange}
                            autoComplete='time'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhPrice">Цена</Label>
                        <Input 
                            type="number" 
                            name="price" 
                            id="exhPrice"
                            onChange={handleChange}
                            autoComplete='price'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhAddr">Адрес</Label>
                        <Input 
                            type="text" 
                            name="address" 
                            id="exhAddr"
                            onChange={handleChange}
                            autoComplete='address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhCateg">Категории</Label>
                        <Input 
                            type="select" 
                            name="categories" 
                            id="exhCateg"
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
                        handleSubmit('#addExhibitionsForm');
                    }}>Добавить</button>
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

export default connect(mapStateToProps, actions)(AddModalExhibitions);