import React, { useEffect, useState } from 'react';
import {Button, Container} from 'reactstrap';
import {connect} from 'react-redux';

import './exhibitionInfo.scss';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';
import {setShortWeekdayName, setMonthName} from '../../dateTransform/dateTransform';

import db from '../../db';

const ExhibitionInfo = ({exhibitionId, isAutorization, setCartCount, cartCount}) => {
    const [exhibitionData, setExhibitionData] = useState(null);

    const [count, setCount] = useState(0);

    const resetCount = () => setCount(0);

    const decrCount = () => {
        if (count > 0) {
            setCount(count - 1);
        } 
    };
    const incrCount = () => setCount(count + 1); 

    useEffect(() => {
        db.exhibitions.forEach(item => {
            if (item.id === +exhibitionId) {
                setExhibitionData(item);
            }
        });
        /* axiosInstance.get(`exhibitions?id=${exhibitionId}`)
            .then(res => {
                setExhibitionData(res.data[0]);
            })
            .catch(err => console.log(err)); */

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buyContent = isAutorization ? 
        <PurchaseBlock 
            resetCount={resetCount}
            count={count}
            decrCount={decrCount}
            incrCount={incrCount}
            id={exhibitionId}
            cartCount={cartCount}
            setCartCount={setCartCount}
        /> : 
        <NoAutorization/>;

    const exhibition = exhibitionData ? <Exhibition isAutorization={isAutorization} buyContent={buyContent} data={exhibitionData}/> : null;

    /* if (exhibitionData) {
        return (        
                <Container>
                    <div className="exhibition-info__img">
                        <img src={exhibitionData.image} alt={exhibitionData.name} />
                    </div>
                    <div className="exhibition-info__title">{exhibitionData.name}</div>
                    <div className="exhibition-info__description">{exhibitionData.description}</div>
                    <div className="exhibition-info__prise">{exhibitionData.price}р.</div>
                    {buyContent}
                </Container>                           
        );
    } else {
        return (
            <p>Wait data...</p>
        );
    } */

    return (
        <div className="container">
            {exhibition}
        </div>
    )

};

const Exhibition = ({buyContent, data, isAutorization}) => {
    const date = new Date(data.date);

    const dateData = {
        day: date.getDate(),
        weekday: setShortWeekdayName(date.getDay()),
        month: setMonthName(date.getMonth()),
    };

    return (
        <>
            <div className="exhibition">
                <div className="exhibition__img">
                    <img src={data.image} alt={data.name} />
                </div>
                <div className="exhibition__purchase-info">
                    <h2 className="exhibition__title title">{data.name}</h2>
                    <div className="exhibition__time">{dateData.day} {dateData.month} ({dateData.weekday}), {data.time}</div>
                    <div className="exhibition__address">{data.address}</div>
                    <div className="exhibition__prise title">{data.price}₽</div>
                    <button disabled={!isAutorization} className="exhibition__add-to-cart">Купить билет</button>
                    {buyContent}
                </div>
            </div>
            <div className="details">
                <div className="details__title title">
                    Подробнее о выставке:
                </div>
                <div className="details__text">
                    {data.description}
                </div>
            </div>
        </>
        
    )
};

const PurchaseBlock = ({count, decrCount, incrCount, id, resetCount, setCartCount, cartCount}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const disabled = !(count > 0);

    const handleSubmit = () => {

        if (!disabled) {
            setSuccess(false);
            setError(false);
            setLoading(true);

            axiosInstance.put(`cart/add/${id}/${count}`)
                .then(() => {
                    setLoading(false);
                    setSuccess(true);
                    setCartCount(cartCount, 1);

                    resetCount();

                    setTimeout(() => setSuccess(false), 2000);
                })
                .catch(err => {
                    setLoading(false);
                    setError(true);

                    console.log('Add caert err', err);
                })
        }
    }

    const loadingText = loading ? 'Подождите...' : null;
    const errorText = error ? 'Произошла ошибка...' : null;

    const successText = success ? 'Добавили в корзину!' : null;

    return (
        <div className="purchase">
            <Button 
                className='purchase__btn' 
                disabled={disabled}
                onClick={handleSubmit}
            >
                Добавить в корзину
            </Button>
            <div className="purchase__numbers">
                <Button onClick={decrCount} disabled={disabled} className="purchase__decr">-</Button>
                <div className="purchase__count">{count}</div>
                <Button onClick={incrCount} className="purchase__incr">+</Button>
            </div>
            {loadingText}
            {errorText}
            {successText}
        </div>
    )
};

const NoAutorization = () => {
    return (
        <div className="no-autorization">
            Для приобритения билетов необxодимо авторизироваться
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        cartCount: state.cartCount,
    }
};

export default connect(mapStateToProps, actions)(ExhibitionInfo);