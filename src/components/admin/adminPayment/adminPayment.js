import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './adminPayment.scss';

import * as actions from '../../../actions/actions';
import axiosInstance from '../../../axios';

const AdminPayment = ({exhibitions, exhibitionsRequsted, exhibitionsLoaded, exhibitionsError}) => {
    
    useEffect(() => {
        /* if (exhibitions.length === 0) {
            exhibitionsRequsted();

            axiosInstance.get('exhibitions')
                .then(res => {
                    exhibitionsLoaded(res.data);
                })
                .catch((err) => {
                    console.log(err);

                    exhibitionsError();
                });
        } */
    }, []);

    const exhibitionsList = exhibitions.length !== 0 ? exhibitions.map((item) => {
        return (
            <Link to={`/payment-list/${item.id}`} key={item.id} className="payment-card">
                <div className="payment-card__id">{item.id}</div>
                <div className="payment-card__name">{item.name}</div>
                <div className="payment-card__price">{item.price}</div>
                <div className="payment-card__date">
                    {item.date}
                </div>
            </Link>
        )
    }) : null;

    /* <div className="admin-payment">
            <div className="admin-payment__title">
                <div className="admin-payment__id">ID</div>
                <div className="admin-payment__name">Name</div>
                <div className="admin-payment__price">Price</div>
                <div className="admin-payment__date">Date</div>
            </div>
            {exhibitionsList}
        </div> */

    return (
        
        <p>Заглушка</p>
    )
};

const mapStateToProps = (state) => {
    return {
        exhibitions: state.exhibitions,
        isLoadingExhibitions: state.isLoadingExhibitions,
        isErrorExhibitions: state.isErrorExhibitions
    }
};

export default connect(mapStateToProps, actions)(AdminPayment);