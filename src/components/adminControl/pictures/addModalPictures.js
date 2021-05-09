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

const AddModalPictures = ({MuseamService, collections, collectionsLoaded, collectionsRequsted, collectionsError, isLoadingCollections, isErrorCollcetions, isOpen, toggle, toggleRefresh}) => {
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
                    <Input type="text" name="name" id="addName"/>
                </FormGroup>
                <FormGroup>
                    <Label for="picAuthor">author</Label>
                    <Input type="text" name="author" id="picAuthor"/>
                </FormGroup>
                <FormGroup>
                    <Label for="picDescription">description</Label>
                    <Input type="text" name="description" id="picDescription"/>
                </FormGroup>
                <FormGroup>
                    <Label for="picImage">image</Label>
                    <Input type="file" name="image" id="picImage" />
                </FormGroup>
                <FormGroup>
                    <Label for='picCategories'>Categories</Label>
                    <Input 
                        type="select" 
                        name="categories" 
                        id="picCategories"
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
                        MuseamService.setItem('#addPictureForm', '/pictures/create')
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

export default WithMuseamService()(connect(mapStateToProps, actions)(AddModalPictures));