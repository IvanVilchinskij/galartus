import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

const CartBtn = ({cartCount}) => {
    const count = cartCount === 0 ? null : cartCount;

    const content = localStorage.getItem('access_token') ? 
        <Button><Link to='/cart'>Корзина {count}</Link></Button> 
        : null;

    return (
        <div className="cart-btn">
            {content}
        </div>
    );
};

export default CartBtn;