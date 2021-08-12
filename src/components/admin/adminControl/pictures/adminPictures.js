import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../../actions/actions';
import axiosInstance from '../../../../axios';
import AddModalPictures from './addModalPictures';
import EditModalPictures from './editModalPictures';
import DeleteModal from '../deleteModal';
import Spinner from '../../../spinner/spinner';
import db from '../../../../db';
import icons from '../../../../icons/icons.svg';

const AdminPictures = ({pictures, picturesLoaded, isLoadingPictures, isErrorPictures, picturesRequsted, picturesError}) => {
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
        /* picturesRequsted();

        axiosInstance.get('pictures')
            .then(res => {
                picturesLoaded(res.data);
            })
            .catch(() => {
                picturesError();
            }); */
        picturesLoaded(db.pictures);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

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

    const picturesList = pictures ? pictures.map(item => {
        const itemCategories = [];

        item.categories.forEach(el => {
            db.collections.forEach(collection => {
                if (el === collection.id) {
                    itemCategories.push(collection.name);
                }
            });
        });

        return (
            <div key={item.id} className="admin-list__item">
                <div className="admin-list__item-id admin-list__item-id">{item.id}</div>
                <div className="admin-list__item-name admin-list__item-name--pictures">{item.name}</div>
                <div className="admin-list__item-categories admin-list__item-categories--pictures">{itemCategories.join(', ')}</div>
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

    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    return (
        <>  
            <div className="admin-list">
                <div className="admin-list__titles">
                    <div className="admin-list__id-title">ID</div>
                    <div className="admin-list__name-title admin-list__name-title--pictures">Название</div>
                    <div className="admin-list__categories-title admin-list__categories-title--pictures">Категории</div>
                </div>
                {loadingContent}
                {picturesList}
                {errorContent}
            </div>
            <button className='admin-add-btn' onClick={toggleAddModal}>Добавить картину</button>
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
                url={`pictures/`}
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

export default connect(mapStateToProps, actions)(AdminPictures);