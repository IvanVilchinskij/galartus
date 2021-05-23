import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'reactstrap';

import * as actions from '../../../../actions/actions';
import axiosInstance from '../../../../axios';
import AddModalExhibitions from './addModalExhibitions';
import EditModalExhibitions from './editModalExhibitions';
import DeleteModal from '../deleteModal';
import Spinner from '../../../spinner/spinner';

const AdminExhibitions = ({exhibitions, exhibitionsLoaded, exhibitionsRequsted, exhibitionsError, isLoadingExhibitions, isErrorExhibitions}) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        exhibitionsRequsted();

        axiosInstance.get('exhibitions')
            .then(res => {
                exhibitionsLoaded(res.data);
            })
            .catch(() => exhibitionsError());

        return function cleanup() {
            exhibitionsLoaded([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const exhibitionsList = exhibitions ? exhibitions.map((item) => {
        return (
            <div key={item.id} className="admin-card">
                <div className="admin-card__id">{item.id}</div>
                <div className="admin-card__name admin-card__name--five">{item.name}</div>
                <div className="admin-card__categories admin-card__categories--five">{item.categories.join(', ')}</div>
                <div className="admin-card__price">{item.price}</div>
                <div className="admin-card__date">
                    {item.date}
                    <br/>
                    {item.time}
                </div>
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

    const loadingContent = isLoadingExhibitions ? <LoadingCard/> : null;

    const errorContent = isErrorExhibitions ? <ErrorCard/> : null;

    return (
        <>  
            <Button className='admin__add-btn' onClick={toggleAddModal}>+ exhibition</Button>
            <div className="admin-cards">
                <div className="admin-cards__title">
                    <div className="admin-cards__id">Id</div>
                    <div className="admin-cards__name admin-cards__name--five">Name</div>
                    <div className="admin-cards__categories admin-cards__categories--five">Categories</div>
                    <div className="admin-cards__price">price</div>
                    <div className="admin-cards__date">Date</div>
                    <div className="admin-cards__control">
                        <div className="admin-cards__edit">EDIT</div>
                        <div className="admin-cards__delete">DELETE</div>
                    </div>
                </div>
                {loadingContent}
                {exhibitionsList}
                {errorContent}
            </div>
            <AddModalExhibitions 
                isOpen={addModal} 
                toggle={toggleAddModal} 
                toggleRefresh={toggleRefresh}
            />
            <EditModalExhibitions 
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