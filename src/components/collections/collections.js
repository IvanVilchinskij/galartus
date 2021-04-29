import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {Card, 
        CardTitle, 
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
import {Link} from 'react-router-dom';

import * as actions from '../../actions/actions';
import WithMuseamService from '../hoc/withMuseamService';
import Spinner from '../spinner/spinner';
/* import EditModal from '../editModal/editModal'; */

import './collections.scss';

const Collections = ({MuseamService, collectionsLoaded, collections, loadingCollections, defCurrentCollection}) => {
    const [modal, setModal] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [modalId, setModalId] = useState();
    const [modalName, setModalName] = useState();

    const toggle = () => setModal(!modal);

    useEffect(() => {
        MuseamService.getList('/categories')
            .then(res => {
                collectionsLoaded(res);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, [updateTrigger]);

    const collectionsCards = collections.map((item) => {
        return (
            <Card className='collection-card' key={item.id} body>
                <div className="collection-card__edit" onClick={()=>{
                    setModalId(item.id);            
                    setModalName(item.name);
                    toggle();
                }}></div>
                <div className="collection-card__delete" onClick={() => {
                    let timerId = setInterval(() => {
                        setUpdateTrigger(!updateTrigger);

                        if (MuseamService.triggerVar) {
                            clearInterval(timerId);
                        }
                    }, 100);

                    MuseamService.deleteCollection(item.id);
                }}></div>
                <div className="collection-card__content-wrapper">
                    <div className="collection-card__img">
                        <img src={item.image} alt={item.name}/>                       
                    </div>     
                    <CardTitle className='collection-card__title'>{item.name}</CardTitle>
                </div>       
                <Button>
                    <Link onClick={() => defCurrentCollection(item.id)} to={`/collections/${item.id}`}>Подробнее</Link>
                </Button>
            </Card>
        );
    });
    
    const content = loadingCollections ? <LoadingCard/> : collectionsCards;

    return (
        <div className="collection__flex-wrapper">
            {content}
            <Modal  isOpen={modal} toggle={toggle}>
                    <Form id='editForm'>
                        <ModalHeader toggle={toggle}>Редактирование элемента '{modalName}'</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="editName">Name</Label>
                                <Input type="text" name="name" id="editName"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="editImage">File</Label>
                                <Input type="file" name="image" id="editImage" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => {
                                let timerId = setInterval(() => {
                                    setUpdateTrigger(!updateTrigger);

                                    if (MuseamService.triggerVar) {
                                        clearInterval(timerId);
                                    }
                                }, 100);

                                MuseamService.editCollection('#editForm', modalId);

                                toggle();                    
                            }}>Do Something</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Form>     
            </Modal>    
        </div>
    );
};

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <Spinner/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        collections: state.collections,
        loadingCollections: state.loadingCollections,
        currentCollection: state.currentCollection
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(Collections));