import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import * as actions from '../../../actions/actions';
import WithMuseamService from '../../hoc/withMuseamService';
import AddModalPictures from './addModalPictures';
import EditModalPictures from './editModalPictures';
import DeleteModal from '../deleteModal';
import Spinner from '../../spinner/spinner';

const AdminPictures = ({pictures, MuseamService, picturesLoaded, isLoadingPictures, isErrorPictures, picturesRequsted, picturesError}) => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [modalId, setModalId] = useState();
    const [modalName, setModalName] = useState();

    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => setRefresh(!refresh);

    const toggleAddModal = () => setAddModal(!addModal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        picturesRequsted();

        MuseamService.getList('/pictures')
            .then(res => {
                picturesLoaded(res);
            })
            .catch((err) => {
                picturesError();
            });
    }, [refresh]);

    const picturesList = pictures ? pictures.map(item => {
        return (
            <div key={item.id} className="admin-card">
                <div className="admin-card__id">{item.id}</div>
                <div className="admin-card__categories">{item.categories.join(', ')}</div>
                <div className="admin-card__name admin-card__name--three">{item.name}</div>
                <div className="admin-card__control">
                    <button onClick={() => {
                        setModalId(item.id);
                        setModalName(item.name);
                        toggleEditModal();                 
                    }} className="admin-card__edit">EDIT</button>
                    <button onClick={() => {
                        setModalId(item.id);
                        setModalName(item.name);
                        toggleDeleteModal();  
                    }} className="admin-card__delete">DELETE</button>
                </div>
            </div>
        );
    }) : null;

    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    return (
        <>  
            <Button className='admin__add-btn' onClick={toggleAddModal}>+ Picture</Button>
            <div className="admin-cards">
                <div className="admin-cards__title">
                    <div className="admin-cards__id">Id</div>
                    <div className="admin-cards__categories">Categories</div>
                    <div className="admin-cards__name admin-cards__name--three">Name</div>
                    <div className="admin-cards__control">
                        <div className="admin-cards__edit">EDIT</div>
                        <div className="admin-cards__delete">DELETE</div>
                    </div>
                </div>
                {loadingContent}
                {picturesList}
                {errorContent}
            </div>
            <AddModalPictures 
                isOpen={addModal} 
                toggle={toggleAddModal} 
                toggleRefresh={toggleRefresh}
            />
            <EditModalPictures
                isOpen={editModal} 
                toggle={toggleEditModal} 
                toggleRefresh={toggleRefresh} 
                modalId={modalId}
                modalName={modalName}
            />
            <DeleteModal
                isOpen={deleteModal} 
                toggle={toggleDeleteModal} 
                toggleRefresh={toggleRefresh}
                modalId={modalId}
                modalName={modalName}
                url={`/pictures/`}
            />
        </>
    );
};

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <Spinner/>
        </div>
    );
};

const ErrorCard = () => {
    return (
        <div className="error-card">
            Error
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.pictures,
        isLoadingPictures: state.isLoadingPictures,
        isErrorPictures: state.isErrorPictures
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(AdminPictures));