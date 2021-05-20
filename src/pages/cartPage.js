import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Cart from '../components/cart/cart';

const CartPage = ({toggleHeaderColor}) => {

    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    return (
        <Cart/>
    );
};

const mapStateToProps = () => {
    return {

    }
}; 

export default connect(mapStateToProps, actions)(CartPage);