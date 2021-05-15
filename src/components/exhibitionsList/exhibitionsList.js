import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    Container
  } from 'reactstrap';

import './exhibitionsList.scss';

import * as actions from '../../actions/actions';
import axiosInstance from '../../axios';
import Spinner from '../spinner/spinner';

const ExhibitionsList = ({exhibitionsLoaded, exhibitionsError, exhibitions, isLoadingExhibitions, isErrorExhibitions, exhibitionsRequsted}) => {

    useEffect(() => {
        exhibitionsRequsted();
        
        axiosInstance.get('exhibitions')
            .then(res => {
                exhibitionsLoaded(res.data);
            })
            .catch(() => exhibitionsError());

        return function cleanup() {
            exhibitionsLoaded([]);
        }
    }, []);

    const setMonthName = (month) => {
        switch (month) {
            case 0:
                return 'января';
            case 1:
                return 'февраля';
            case 2:
                return 'марта';
            case 3:
                return 'апреля';
            case 4:
                return 'мая';
            case 5:
                return 'июня';
            case 6:
                return 'июля';
            case 7:
                return 'августа';
            case 8:
                return 'сентября';
            case 9:
                return 'октября';
            case 10:
                return 'ноября';
            case 11:
                return 'декабря';
            default:
                return 'не корректный месяц';
        }
    };

    const setWeekdayName = (weekday) => {
        switch (weekday) {
            case 0:
                return 'воскресенье';
            case 1:
                return 'понедельник';
            case 2:
                return 'вторник';
            case 3:
                return 'среда';
            case 4:
                return 'четверг';
            case 5:
                return 'пятница';
            case 6:
                return 'суббота';
            default:
                return 'не корректный день недели';
        }
    };

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
                        weekday: setWeekdayName(date.getDay()),
                        month: setMonthName(date.getMonth()),
                        year: date.getFullYear(),
                    };

                    return (
                        <div key={item.id} className="exhibition-card">
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
                        </div>
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
            <Container>
                <div className="exhibitions__title title">
                    Выставки музея
                </div>
                <div className="exhibitions__flex-wrapper">
                    {loadingContent}
                    {content}
                    {errorContent}
                </div>    
            </Container>
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

/* <Card key={item.id} className='exhibitions-card'>
                            <div className="exhibitions-card__img">
                                <CardImg top width="100%" src={item.image} alt={item.title} />
                            </div>
                            <CardBody>
                                <CardTitle tag="h5">{item.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{item.date}</CardSubtitle>
                                <CardText>
                                    <small className="text-muted">{item.address}</small>
                                </CardText>
                            </CardBody>
                        </Card> */