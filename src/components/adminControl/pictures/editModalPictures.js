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

const EditModalPictures = ({MuseamService, collections, collectionsLoaded, collectionsRequsted, collectionsError, isLoadingCollections, isErrorCollcetions, isOpen, toggle, modalId, toggleRefresh, modalName}) => {
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
            <Form id='editPictureForm'>
                <ModalHeader toggle={toggle}>Изменеие {modalName}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="picEditName">Name</Label>
                        <Input type="text" name="name" id="addEditName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditAuthor">author</Label>
                        <Input type="text" name="author" id="picEditAuthor"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditDescription">description</Label>
                        <Input type="text" name="description" id="picEditDescription"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="picEditImage">image</Label>
                        <Input type="file" name="image" id="picEditImage" />
                    </FormGroup>
                    <FormGroup>
                        <Label for='picEditCategories'>Categories</Label>
                        <Input 
                            type="select" 
                            name="categories" 
                            id="picEditCategories"
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
                        MuseamService.editItem('/pictures/', '#editPictureForm', modalId)
                            .then(res => {
                                toggleRefresh();
                                toggle();
                            });
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

export default WithMuseamService()(connect(mapStateToProps, actions)(EditModalPictures));