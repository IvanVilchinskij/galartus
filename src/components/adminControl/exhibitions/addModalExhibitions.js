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

import axiosInstance from '../../../axios';
import * as actions from '../../../actions/actions';

const AddModalExhibitions = ({collections, isLoadingCollections, isErrorCollcetions, isOpen, toggle, toggleRefresh}) => {
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

    const handleChange = (e) => {
        const target = e.target;

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

    const handleSubmit = (formId) => {
        const form = document.querySelector(formId)
        const formData = new FormData(form);

        formData.set('name', exhibitionData.name);
        formData.set('description', exhibitionData.description);
        formData.set('image', exhibitionImg.image[0]);
        formData.set('date', exhibitionData.date);
        formData.set('time', exhibitionData.time);
        formData.set('price', exhibitionData.price);
        formData.set('address', exhibitionData.address);
        formData.set('weekday', exhibitionData.weekday);

        axiosInstance.post('exhibitions/create', formData)
            .then(() => {
                toggleRefresh();
                toggle();
            });
    };

    const collectionsOptions = collections ?  collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    }) : null;

    const loadingContent = isLoadingCollections ? 'Loading' : null;

    const errorContent = isErrorCollcetions ? 'Error' : null;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Form id='addExhibitionsForm'>
                <ModalHeader toggle={toggle}>Добавление выставки</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exhName">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="exhName"
                            onChange={handleChange}
                            autoComplete='name'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDescription">description</Label>
                        <Input 
                            type="text" 
                            name="description" 
                            id="exhDescription"
                            onChange={handleChange}
                            autoComplete='description'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhImage">File</Label>
                        <Input 
                            accept='image/*'
                            type="file" 
                            name="image" 
                            id="exhImage" 
                            onChange={handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDate">Date</Label>
                        <Input 
                            type="date" 
                            name="date" 
                            id="exhDate"
                            onChange={handleChange}
                            autoComplete='date'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhTime">Time</Label>
                        <Input 
                            type="time" 
                            name="time" 
                            id="exhTime"
                            onChange={handleChange}
                            autoComplete='time'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhPrice">Price</Label>
                        <Input 
                            type="number" 
                            name="price" 
                            id="exhPrice"
                            onChange={handleChange}
                            autoComplete='price'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhAddr">Address</Label>
                        <Input 
                            type="text" 
                            name="address" 
                            id="exhAddr"
                            onChange={handleChange}
                            autoComplete='address'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhWeekday">weekday</Label>
                        <Input 
                            type="text" 
                            name="weekday" 
                            id="exhWeekday"
                            onChange={handleChange}
                            autoComplete='weekday'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhCateg">categories</Label>
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
                    <Button color="primary" onClick={() => {
                        handleSubmit('#addExhibitionsForm');
                    }}>Добавить</Button>
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

export default connect(mapStateToProps, actions)(AddModalExhibitions);