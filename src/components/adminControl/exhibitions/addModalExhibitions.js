import React, {useEffect} from 'react';
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

import WithMuseamService from '../../hoc/withMuseamService';
import * as actions from '../../../actions/actions';

const AddModalExhibitions = ({MuseamService, collections, collectionsRequsted, collectionsError, isLoadingCollections, isErrorCollcetions, collectionsLoaded, isOpen, toggle, toggleRefresh}) => {
    useEffect(() => {
        collectionsRequsted();

        MuseamService.getList('/categories')
            .then(res => {
                collectionsLoaded(res);
            })
            .catch(err => {
                collectionsError();
            });
    }, []);

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
                <ModalHeader toggle={toggle}>Добавление коллекции</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exhName">Name</Label>
                        <Input type="text" name="name" id="exhName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDescription">description</Label>
                        <Input type="text" name="description" id="exhDescription"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhImage">File</Label>
                        <Input type="file" name="image" id="exhImage" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhDate">Date</Label>
                        <Input type="date" name="date" id="exhDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhTime">Time</Label>
                        <Input type="time" name="time" id="exhTime"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhPrice">Price</Label>
                        <Input type="number" name="price" id="exhPrice"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhAddr">Address</Label>
                        <Input type="text" name="address" id="exhAddr"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhWeekday">weekday</Label>
                        <Input type="text" name="weekday" id="exhWeekday"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhCateg">categorie</Label>
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
                        MuseamService.setItem('#addExhibitionsForm', '/exhibitions/create')
                            .then((res) => {
                                toggleRefresh();
                                toggle();
                            });
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

export default WithMuseamService()(connect(mapStateToProps, actions)(AddModalExhibitions));