import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import * as actions from '../../../../actions/actions';
import axiosInstance from '../../../../axios';
import AddModalExhibitions from './addModalExhibitions';
import EditModalExhibitions from './editModalExhibitions';
import DeleteModal from '../deleteModal';
import Spinner from '../../../spinner/spinner';
import db from '../../../../db';
import icons from '../../../../icons/icons.svg';
import {setMonthName} from '../../../../dateTransform/dateTransform';

const AdminExhibitions = ({exhibitions, exhibitionsLoaded, exhibitionsRequsted, exhibitionsError, isLoadingExhibitions, isErrorExhibitions}) => {
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
        if (exhibitions.length === 0 || isUpdate) {
            /* exhibitionsRequsted();

            axiosInstance.get('exhibitions')
                .then(res => { 
                    exhibitionsLoaded(res.data);
                    setIsUpdate(false);
                })
                .catch(() => {
                    exhibitionsError();
                    setIsUpdate(false);
                }); */

            exhibitionsLoaded(db.exhibitions);
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

    const exhibitionsList = exhibitions.length !== 0 ? exhibitions.map((item) => {
        const itemCategories = [];

        item.categories.forEach(el => {
            db.collections.forEach(collection => {
                if (el === collection.id) {
                    itemCategories.push(collection.name);
                }
            });
        });

        const date = new Date(item.date);
        const dateData = {
            day: date.getDate(),
            month: setMonthName(date.getMonth()),
            year: date.getFullYear(),
        };

        return (
            <div key={item.id} className="admin-list__item">
                <div className="admin-list__item-id admin-list__item-id">{item.id}</div>
                <div className="admin-list__item-name admin-list__item-name--exhibitions">{item.name}</div>
                <div className="admin-list__item-categories admin-list__item-categories--exhibitions">{itemCategories.join(', ')}</div>
                <div className="admin-list__item-date admin-list__item-date--exhibitions">{dateData.day} {dateData.month} {dateData.year}<br/>{item.time}</div>
                <div className="admin-list__item-price admin-list__item-price--exhibitions">{item.price} руб.</div>
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

    const loadingContent = isLoadingExhibitions ? <LoadingCard/> : null;

    const errorContent = isErrorExhibitions ? <ErrorCard/> : null;

    return (
        <>  
            <div className="admin-list">
                <div className="admin-list__titles">
                    <div className="admin-list__id-title">ID</div>
                    <div className="admin-list__name-title admin-list__name-title--exhibitions">Название</div>
                    <div className="admin-list__categories-title admin-list__categories-title--exhibitions">Категории</div>
                    <div className="admin-list__date-title admin-list__date-title--exhibitions">Дата</div>
                    <div className="admin-list__price-title admin-list__price-title--exhibitions">Стоимость</div>
                </div>
                {loadingContent}
                {exhibitionsList}
                {errorContent}
            </div>
            <button className='admin-add-btn ' onClick={toggleAddModal}>Добавить выставку</button>
            <AddModalExhibitions 
                isOpen={addModal} 
                toggle={toggleAddModal} 
                setUpdate={setUpdate}
            />
            <EditModalExhibitions 
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
                url={`exhibitions/`}
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
        exhibitions: state.exhibitions,
        isLoadingExhibitions: state.isLoadingExhibitions,
        isErrorExhibitions: state.isErrorExhibitions
    }
};

export default connect(mapStateToProps, actions)(AdminExhibitions);