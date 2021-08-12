import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import '../styles/pages/paymentListPage.scss';

import * as actions from '../actions/actions';
import PaymentList from '../components/paymentList/paymentList';

const PaymentListPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {id} = useParams();

    return (
        <div className="payment-list-page">
            <div className='container'>
                <PaymentList exhId={id}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        
    }
};


export default connect(mapStateToProps, actions)(PaymentListPage);