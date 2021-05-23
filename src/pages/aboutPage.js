import React, {useEffect} from 'react';
import { Container } from 'reactstrap';
import {connect} from 'react-redux';

import '../styles/pages/aboutPage.scss';

import * as actions from '../actions/actions';

const AboutPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <>
            <div className="about">
            <Container>
                <h3 className='about__uptitle'>О нас</h3>
                <h2 className="about__title">Музей Галартус</h2>
                <div className="about__img">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/%D0%9D%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8_%D0%A2%D0%B0%D1%82%D0%B0%D1%80%D1%81%D1%82%D0%B0%D0%BD.JPG/1200px-%D0%9D%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BC%D1%83%D0%B7%D0%B5%D0%B9_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8_%D0%A2%D0%B0%D1%82%D0%B0%D1%80%D1%81%D1%82%D0%B0%D0%BD.JPG" alt="veptq"/>
                </div>
                <div className="about__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, optio iste. Quae voluptatibus dolor minima cupiditate suscipit voluptate fugit aut explicabo, quis dolore ut quaerat vero optio voluptates, nam nesciunt. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus laudantium, libero accusantium minima suscipit aut quidem placeat quo! Facere molestiae nam saepe dolorum in eligendi non quaerat eveniet ducimus! Sapiente!</div>
                <div className="info">
                    <div className="info__about-block">
                        <div className="info__row">
                            <div className="info__name">График работы</div>
                            <div className="info__value">10:00-21:00</div>
                        </div>
                        <div className="info__row">
                            <div className="info__name">Адресс</div>
                            <div className="info__value">Новаторов 1</div>
                        </div>
                        <div className="info__row">
                            <div className="info__name">Телефон</div>
                            <div className="info__value">8-800-555-35-35</div>
                        </div>
                        <div className="info__row">
                            <div className="info__name">Почта</div>
                            <div className="info__value">qweqr@muzia.su</div>
                        </div>
                    </div>
                    <div className="info__map">
                        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17946.671958700725!2d49.093792928857084!3d55.78743812806881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead219941ae53%3A0x5b0126a895b9ce7d!2z0JrQsNC30LDQvdGB0LrQuNC5INC60YDQtdC80LvRjA!5e0!3m2!1sru!2sru!4v1617035864836!5m2!1sru!2sru" loading="lazy"></iframe>
                    </div>
                </div>
            </Container>
        </div>
        </>
        
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AboutPage);