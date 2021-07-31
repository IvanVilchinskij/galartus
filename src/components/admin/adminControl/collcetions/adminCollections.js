import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import * as actions from '../../../../actions/actions';
import axiosInstance from '../../../../axios';
import AddModalCollcetions from './addModalCollcetions';
import EditModalCollcetions from './editModalCollcetions';
import DeleteModal from '../deleteModal';
import Spinner from '../../../spinner/spinner';
import db from '../../../../db';
import icons from '../../../../icons/icons.svg';

const AdminCollections = ({collections, collectionsLoaded, isErrorCollcetions, isLoadingCollections, collectionsRequsted, collectionsError}) => {
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [modalId, setModalId] = useState();
    const [modalName, setModalName] = useState();

    const [isUpdate, setIsUpdate] = useState(false);

    const setUpdate = () => setIsUpdate(true);

    const toggleAddModal = () => setAddModal(!addModal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDeleteModal = () => setDeleteModal(!deleteModal);

    useEffect(() => {
        if (collections.length === 0 || isUpdate) {
            /* collectionsRequsted();

            axiosInstance.get('categories')
                .then(res => {
                    collectionsLoaded(res.data);
                    setIsUpdate(false);
                })
                .catch(() => {
                    collectionsError();
                    setIsUpdate(false);
                }); */
                collectionsLoaded(db.collections);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate]);

    const handleClikEdit = (item) => {
        setModalId(item.id);
        setModalName(item.name);
        toggleEditModal(); 
    };

    const handleClikDelete = (item) => {
        setModalId(item.id);
        setModalName(item.name);
        toggleDeleteModal(); 
    };

    const collectionsList = collections.length !== 0 ? collections.map((item) => {
        return (
            <div key={item.id} className="admin-list__item">
                <div className="admin-list__item-id admin-list__item-id--collections">{item.id}</div>
                <div className="admin-list__item-name admin-list__item-name--collections">{item.name}</div>
                <div className="admin-list__item-control">
                    <svg 
                        onClick={() => handleClikEdit(item)} 
                        className="admin-list__item-edit"
                    >
                        <use href={`${icons}#edit`}></use>
                    </svg>
                    <svg 
                        onClick={() => handleClikDelete(item)} 
                        className="admin-list__item-delete"
                    >
                        <use href={`${icons}#delete`}></use>
                    </svg>
                </div>
            </div>
        );
    }) : null;

    const loadingContent = isLoadingCollections ? <LoadingCard/> : null;

    const errorContent = isErrorCollcetions ? <ErrorCard/> : null;

    return (
        <>     
            <div className="admin-list">
                <div className="admin-list__titles">
                    <div className="admin-list__id-title admin-list__id-title--collections">ID</div>
                    <div className="admin-list__name-title admin-list__name-title--collections">Название</div>
                </div>
                {loadingContent}
                {collectionsList}
                {errorContent}
            </div>
            <button className='admin-add-btn' onClick={toggleAddModal}>Добавить коллекцию</button>
            <AddModalCollcetions 
                isOpen={addModal} 
                toggle={toggleAddModal} 
                setUpdate={setUpdate}
            />
            <EditModalCollcetions 
                isOpen={editModal}
                toggle={toggleEditModal} 
                setUpdate={setUpdate}
                modalId={modalId}
                modalName={modalName}
            />
            <DeleteModal
                isOpen={deleteModal} 
                toggle={toggleDeleteModal}
                setUpdate={setUpdate} 
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