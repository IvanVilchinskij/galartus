import React, { useEffect, useState } from 'react';
import {Button, Container} from 'reactstrap';

import './exhibitionInfo.scss';

import axiosInstance from '../../axios';

const ExhibitionInfo = ({exhibitionId, isAutorization}) => {
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
        axiosInstance.get(`exhibitions?id=${exhibitionId}`)
            .then(res => {
                setExhibitionData(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    const buyContent = isAutorization ? 
        <PurchaseBlock 
            resetCount={resetCount}
            count={count}
            decrCount={decrCount}
            incrCount={incrCount}
            id={exhibitionId}
        /> : 
        <NoAutorization/>;

    if (exhibitionData) {
        return (        
            <div className="exhibition-info">
                <Container>
                    <div className="exhibition-info__img">
                        <img src={exhibitionData.image} alt={exhibitionData.name} />
                    </div>
                    <div className="exhibition-info__title">{exhibitionData.name}</div>
                    <div className="exhibition-info__description">{exhibitionData.description}</div>
                    <div className="exhibition-info__prise">{exhibitionData.price}р.</div>
                    {buyContent}
                </Container>                    
            </div>        
        );
    } else {
        return (
            <p>Wait data...</p>
        );
    }

};

const PurchaseBlock = ({count, decrCount, incrCount, id, resetCount}) => {
    const disabled = count > 0 ? false : true;

    const handleSubmit = () => {
        if (!disabled) {
            axiosInstance.put(`cart/add/${id}/${count}`)
                .then(() => resetCount())
                .catch(err => console.log(err))
        }
    }

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
        </div>
    )
};

const NoAutorization = () => {
    return (
        <div className="no-autorization">
            Для приобритения билетов необxодимо авторизироваться
        </div>
    )
}

export default ExhibitionInfo;