import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './exhibitionsList.scss';

import * as actions from '../../actions/actions';
import axiosInstance from '../../axios';
import Spinner from '../spinner/spinner';
import * as transformDate from '../../dateTransform/dateTransform';
import db from '../../db';

const ExhibitionsList = ({exhibitionsLoaded, exhibitionsError, exhibitions, isLoadingExhibitions, isErrorExhibitions, exhibitionsRequsted}) => {

    useEffect(() => {

        /* if (exhibitions.length === 0) {
            exhibitionsRequsted();
        
            axiosInstance.get('exhibitions')
                .then(res => {
                    exhibitionsLoaded(res.data);
                })
                .catch(() => exhibitionsError());
        } */

        exhibitionsLoaded(db.exhibitions);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setItemsContent = (items) => {
        if (items.length === 0) {
            return (
                <p>Тут пусто(</p>
            );
        } else {
            return (
                items.map((item) => {

                    const date = new Date(item.date);

                    const dateData = {
                        day: date.getDate(),
                        weekday: transformDate.setWeekdayName(date.getDay()),
                        month: transformDate.setMonthName(date.getMonth()),
                        year: date.getFullYear(),
                    };

                    return (
                        <Link to={`/exhibitions/${item.id}`} key={item.id} className="exhibition-card">
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
                })
            );    
        }
    };

    const exhibitionsCards = exhibitions ? setItemsContent(exhibitions) : null;

    const loadingContent = isLoadingExhibitions ? <LoadingCard/> : null;

    const errorContent = isErrorExhibitions ? <ErrorCard/> : null;

    const content = !isLoadingExhibitions && !isErrorExhibitions ? exhibitionsCards : null;

    return (
        <div className="exhibitions">
            <div className='container'>
                <div className="exhibitions__title title page-title">
                    Выставки музея
                </div>
                <div className="exhibitions__flex-wrapper">
                    {loadingContent}
                    {content}
                    {errorContent}
                </div>    
            </div>
        </div>
    );
};

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <Spinner/>
        </div>
    );
};

const ErrorCard = () => {
    return (
        <div className="error-card">
            Error
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

export default connect(mapStateToProps, actions)(ExhibitionsList);