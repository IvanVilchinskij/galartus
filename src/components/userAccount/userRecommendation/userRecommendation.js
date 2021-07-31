import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import axiosInstance from '../../../axios';
import * as transformDate from '../../../dateTransform/dateTransform';

const UserReccomendation = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        /* axiosInstance.get('users/recommendation')
            .then(res => setRecommendations(res.data))
            .catch(err => console.log(err)); */
    }, []);

    const recommendationsCards = recommendations.length > 0 ? recommendations.map(item => {
        const date = new Date(item.date);

        const dateData = {
            day: date.getDate(),
            weekday: transformDate.setWeekdayName(date.getDay()),
            month: transformDate.setMonthName(date.getMonth()),
            year: date.getFullYear(),
        };

        return (
            <Link to={`/exhibitions/${item.id}`} key={item.id} className="exhibition-card exhibition-card--xs">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className='exhibition-card__img'
                />
                <div className="exhibition-card__rectangle"></div>
                <div className="exhibition-card__header">
                    <div className="exhibition-card__date-block">
                        <div className="exhibition-card__date-number">
                            {dateData.day}
                        </div>
                        <div className="exhibition-card__date">
                            <div className="exhibition-card__month">
                                {dateData.month}
                            </div>
                            <div className="exhibition-card__weekday">
                                {dateData.weekday}
                            </div>
                        </div>
                    </div>
                    <div className="exhibition-card__location">
                        <div className="exhibition-card__address">
                            {item.address}
                        </div>
                        <div className="exhibition-card__time">
                            {item.time.slice(0, 5)}
                        </div>
                    </div>
                </div>
                <div className="exhibition-card__footer">
                    <div className="exhibition-card__title">
                        {item.name}
                    </div>
                </div>
            </Link>
        );
    }) : <h3>Пусто</h3>

    return (
        <div className="exhibitions__flex-wrapper">
            {recommendationsCards}
        </div>        
    );
};

export default UserReccomendation;