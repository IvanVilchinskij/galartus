import React from 'react';
import {Container} from 'reactstrap';

import img1 from './imgs/1.jpg';
import img2 from './imgs/2.png';
import img3 from './imgs/3.jpg';
import img4 from './imgs/4.jpg';

import './comingEvents.scss';

const events = [
    {   
        id: 1,
        title: '«‎Магические картины»‎ Пабло Пикасcо',
        date: {
            day: 10,
            month: 'апреля',
            year: 2021,
            time: 12,
            weekDay: 'суббота'
        },
        street: 'ул. Нижняя Сыромятническая, 10',
        src: img3
    },
    {   
        id: 2,
        title: '10 великих художников Эпохи Возрождения',
        date: {
            day: 15,
            month: 'мая',
            year: 2021,
            time: 14,
            weekDay: 'суббота'
        },
        street: 'ул. Шейнкмана, 12',
        src: img1
    },
    {   
        id: 3,
        title: 'Эпоха модерна',
        date: {
            day: 3,
            month: 'июня',
            year: 2021,
            time: 15,
            weekDay: 'суббота'
        },
        street: 'ул. Кремлевская, 2',
        src: img4
    },
    {   
        id: 4,
        title: 'Русское искусство второй половины XIX – начала XX века',
        date: {
            day: 10,
            month: 'июня',
            year: 2021,
            time: 15,
            weekDay: 'суббота'
        },
        street: 'ул. Кремлевская, 2',
        src: img2
    },
];

const ComingEvents = () => {

    const cards = events.map((item) => {
        return (
            <div key={item.id} className="event-card">
                <img src={item.src} alt={item.title} className="event-card__img"/>
                <div className="event-card__rectangle"></div>
                <div className="event-card__header">
                    <div className="event-card__date-block">
                        <div className="event-card__date-number">{item.date.day}</div>
                        <div className="event-card__date">
                            <div className="event-card__month">{item.date.month}</div>
                            <div className="event-card__week-day">{item.date.weekDay}</div>
                        </div>
                    </div>
                    <div className="event-card__location">
                        <div className="event-card__street">
                            {item.street}
                        </div>
                        <div className="event-card__time">
                            {item.date.time}:00
                        </div>
                    </div>
                </div>
                <div className="event-card__footer">
                    <div className="event-card__title">{item.title}</div>
                </div>
            </div>
        );
    });
    
    return (
        <div className="coming-events">
            <Container>
                <h2 className="coming-events__title title">
                    Ближайшие мероприятия
                </h2>
                <div className="coming-events__grid">
                    {cards}
                </div>   
            </Container>
        </div>
    );
};

export default ComingEvents;