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

const EditModalExhibitions = ({MuseamService, collections, collectionsLoaded, collectionsRequsted, collectionsError, isLoadingCollections, isErrorCollcetions, isOpen, toggle, modalId, toggleRefresh, modalName}) => {
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
            <Form id='editExhibitionsForm'>
                <ModalHeader toggle={toggle}>Изменеие {modalName}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="exhEditName">Name</Label>
                        <Input type="text" name="name" id="exhEditName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditDescription">description</Label>
                        <Input type="text" name="description" id="exhEditDescription"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditImage">File</Label>
                        <Input type="file" name="image" id="exhEditImage" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditDate">Date</Label>
                        <Input type="date" name="date" id="exhEditDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditTime">Time</Label>
                        <Input type="time" name="time" id="exhEditTime"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditPrice">Price</Label>
                        <Input type="number" name="price" id="exhEditPrice"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditAddr">Address</Label>
                        <Input type="text" name="address" id="exhEditAddr"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhEditWeekday">weekday</Label>
                        <Input type="text" name="weekday" id="exhEditWeekday"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='exhEditCategories'>Categories</Label>
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
                    <Button color="primary" onClick={() => {
                        MuseamService.editItem('/exhibitions/','#editExhibitionsForm', modalId)
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


export default WithMuseamService()(connect(mapStateToProps, actions)(EditModalExhibitions));