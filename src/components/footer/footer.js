import React from 'react';
import { Link} from 'react-router-dom';

import './footer.scss';

const Footer = () => {
    return (
        <div className="footer">
            <div className='container'>
                <div className="footer__flex-wrapper">
                    <div className="footer__logo">
                        <div className="footer__logo-name title">
                            <Link to='/galartus_front/'>Galartus</Link>            
                        </div>
                        <div className="footer__logo-year">2021</div>
                    </div>
                    <div className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-link">
                                <Link to='/galartus_front/exhibitions'>
                                    <span>Выставки</span> 
                                </Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/galartus_front/collections'>
                                    <span>Коллекции</span> 
                                </Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/galartus_front/about'>
                                    <span>О музее</span>  
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__contacts">
                        <div className="footer__contacts-title title">Контакты</div>
                        <ul className="footer__contacts-list">
                            <li className="footer__contacts-item">Казань, Карла Маркса, 57</li>
                            <li className="footer__contacts-item">
                               <a href="tel:+78432234540">+7 (843) 223-45-40</a> 
                            </li>
                            <li className="footer__contacts-item">
                               <a href="mailto:info@gallartus.ru">info@gallartus.ru</a> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default Footer;