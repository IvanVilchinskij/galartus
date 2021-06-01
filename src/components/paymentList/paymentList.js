import React, { useState, useEffect } from 'react';

import './paymentList.scss';

import axiosInstance from '../../axios';

const PaymentList = ({exhId}) => {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        setLoading(true);

        axiosInstance.get(`employee?exhibition=${exhId}`)
            .then((res) => {
                setLoading(false);

                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);

                setLoading(false);
                setError(true);
            });
    }, []);

    const userList = users.length !== 0 ? users.map(item => {
        const {email, first_name} = item.account;

        return (
            <div key={item.id} className="user-card">          
                <div className="user-card__id">{item.id}</div>
                <div className="user-card__email">{email}</div>
                <div className="user-card__name">{first_name}</div>
                <div className="user-card__quantity">{item.quantity}</div>
                <div className="user-card__amount">{item.amount}</div>
            </div>
        )
    }) : null;

    const loadingText = loading ? 'Загрузка...' : null;
    const errorText = error ? 'Ошибка' : null;
    const emptyText = !userList && !loading && !error ? <div>empty</div> : null;

    return (
        <div className='payment-list'>
            <div className="payment-list__title">
                <div className="payment-list__id">ID</div>
                <div className="payment-list__email">Почта</div>
                <div className="payment-list__name">Имя</div>
                <div className="payment-list__quantity">Кол-во</div>
                <div className="payment-list__amount">Стоимость</div>
            </div>
            {loadingText}
            {userList}
            {errorText}
            {emptyText}
        </div>
        
    )
};

export default PaymentList;