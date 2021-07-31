import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './comingEvents.scss';

import * as actions from '../../actions/actions';
import db from '../../db';
import * as transformDate from '../../dateTransform/dateTransform';

const ComingEvents = ({exhibitionsLoaded, exhibitions}) => {

    useEffect(() => {
        exhibitionsLoaded(db.exhibitions);
    });

    const cards = exhibitions.map((item, i) => {
        const date = new Date(item.date);

        const dateData = {
            day: date.getDate(),
            weekday: transformDate.setWeekdayName(date.getDay()),
            month: transformDate.setMonthName(date.getMonth()),
            year: date.getFullYear(),
        };

        if (i < 3) {
            return (
                <Link to={`/exhibitions/${item.id}`} key={item.id} className="exhibition-card exhibition-card--xl">
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
        } else {
            return null;
        }
        
    });
    
    return (
        <div className="coming-events">
            <div className='container'>
                <h2 className="coming-events__title title">
                    Ближайшие мероприятия
                </h2>
                <div className="coming-events__grid">
                    {cards}
                </div>   
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        exhibitions: state.exhibitions,
        isLoadingExhibitions: state.isLoadingExhibitions,
        isErrorExhibitions: state.isErrorExhibitions
    }
};

export default connect(mapStateToProps, actions)(ComingEvents);