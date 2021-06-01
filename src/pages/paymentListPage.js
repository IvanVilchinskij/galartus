import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import { Container } from 'reactstrap';

import '../styles/pages/paymentListPage.scss';

import * as actions from '../actions/actions';
import PaymentList from '../components/paymentList/paymentList';

const PaymentListPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {id} = useParams();

    return (
        <div className="payment-list-page">
            <Container>
                <PaymentList exhId={id}/>
            </Container>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        
    }
};


export default connect(mapStateToProps, actions)(PaymentListPage);