import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import * as actions from '../../../actions/actions';
import axiosInstance from '../../../axios';
import AddModalCollcetions from './addModalCollcetions';
import EditModalCollcetions from './editModalCollcetions';
import DeleteModal from '../deleteModal';
import Spinner from '../../spinner/spinner';

const AdminCollections = ({collections, collectionsLoaded, isErrorCollcetions, isLoadingCollections, collectionsRequsted, collectionsError}) => {
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
        collectionsRequsted();

        axiosInstance.get('categories')
            .then(res => {
                collectionsLoaded(res.data);
            })
            .catch(() => {
                collectionsError();
            });

        return function cleanup() {
            collectionsLoaded([]);
        }

    }, [refresh]);

    const collectionsList = collections ? collections.map((item) => {
        return (
            <div key={item.id} className="admin-card">
                <div className="admin-card__id">{item.id}</div>
                <div className="admin-card__name">{item.name}</div>
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

    const loadingContent = isLoadingCollections ? <LoadingCard/> : null;

    const errorContent = isErrorCollcetions ? <ErrorCard/> : null;

    return (
        <>  
            <Button className='admin__add-btn' onClick={toggleAddModal}>+ collection</Button>
            <div className="admin-cards">
                <div className="admin-cards__title">
                    <div className="admin-cards__id">Id</div>
                    <div className="admin-cards__name">Name</div>
                    <div className="admin-cards__control">
                        <div className="admin-cards__edit">EDIT</div>
                        <div className="admin-cards__delete">DELETE</div>
                    </div>
                </div>
                {loadingContent}
                {collectionsList}
                {errorContent}
            </div>
            <AddModalCollcetions 
                isOpen={addModal} 
                toggle={toggleAddModal} 
                toggleRefresh={toggleRefresh}
            />
            <EditModalCollcetions 
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
                url={`categories/`}
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
        collections: state.collections,
        isLoadingCollections: state.loadingCollections,
        isErrorCollcetions: state.isErrorCollcetions
    }
};

export default connect(mapStateToProps, actions)(AdminCollections);