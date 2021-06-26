import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import {connect} from 'react-redux';

import './cart.scss';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';

const Cart = ({setCartCount, cartCount}) => {
    const [buyList, setBuyList] = useState([]);
    const [order, setOrder] =useState([]);

    const [loadingPayment, setLoadingPayment] = useState(false);
    const [errorPayment, setErrorPayment] = useState(false);

    const [refresh, setRefresh] = useState(false);
    
    const toggleRefresh = () => setRefresh(!refresh);

    useEffect(() => {
        axiosInstance.get('cart/details?is_ordered=0')
            .then(res => {
                if (res.data.length > 0) {
                    if (res.data[0].items.length > 0) {
                        setBuyList(res.data[0].items);
                        setOrder(res.data[0]);
                    } else {
                        setBuyList([]);
                        setOrder([]);
                    } 
                } else {
                    setBuyList([]);
                    setOrder([]);
                }  
            })
            .catch(err => console.log(err));
    }, [refresh]);

    const handleDelete = (id) => {
        

        axiosInstance.delete(`cart/${id}/remove`)
            .then(() => {
                setLoadingPayment(false);
                setCartCount(cartCount, -1);

                toggleRefresh();
            })
            .catch(err => {
                console.log(err);
            } );
    };

    const handlePayment = () => {
        setErrorPayment(false);
        setLoadingPayment(true);

        axiosInstance.put('cart/payment')
            .then(() => {
                setLoadingPayment(false);

                setCartCount(0, 0);

                setBuyList([]);
                setOrder([]);
                toggleRefresh();
            })
            .catch(err => {
                console.log(err);

                setLoadingPayment(false);
                setErrorPayment(true);
            });
    };

    const loadingPaymentText = loadingPayment ? 'Подождите...' : null;
    const errorPaymentText = errorPayment ? 'Ошибка' : null;

    const purchaseCards = buyList.length > 0 ? buyList.map(item => {
        const {name, date, time} = item.exhibition;

        return (
            <div key={item.id} className="purchase">
                <div className="purchase__name">{name}</div>
                <div className="purchase__date">{date}</div>
                <div className="purchase__time">{time}</div>
                <div className="purchase__quantity">{item.quantity}</div>
                <div className="purchase__price">{item.total}р</div>
                <Button onClick={() => handleDelete(item.id)} className='purchase__delete' color='danger'>X</Button>
            </div>
        )
    }) : <p>Пусто</p>;

    return (
        <div className="cart">
            <Container className='cart__container'>
                <div className="cart__flex-wrapper">
                    <div className="purchase-wrpper">
                        {purchaseCards}
                    </div>
                    <div className="purchase__payment">
                        <div className="purchase__amount">К оплате {order.amount}р</div>
                        <Button 
                            onClick={handlePayment}
                            disabled={buyList.length === 0}
                        >
                            Оплатить
                        </Button>
                        {loadingPaymentText}
                        {errorPaymentText}
                    </div>
                    
                </div>  
            </Container>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cartCount: state.cartCount,
    }
};

export default connect(mapStateToProps, actions)(Cart);