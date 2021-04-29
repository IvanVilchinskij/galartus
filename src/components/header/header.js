import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Container} from 'reactstrap';
import {Link} from 'react-router-dom';

import LogInModal from '../logInModal/logInModal';
import * as actions from '../../actions/actions';

import smallWhiteArrow from './img/smalWhiteArrow.svg';
import smallBlackArrow from './img/smalBlackArrow.svg';

import './header.scss';

const Header = ({darkHeader}) => {
    const [isOpen, setIsOpen] = useState(false);

    const darkClass = darkHeader ? 'dark-color' : '';

    const smallArrow = darkHeader ? smallBlackArrow : smallWhiteArrow;

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className='header'>
            <Container className='header__flex-wrapper'>
                <div className="header__logo">
                    <Link className={darkClass} to='/'>Галартус</Link>
                </div>
                <div className="header__control">
                    <nav className="header__nav nav">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link className={darkClass}  to='/exhibitions'>Выставки</Link>
                            </li>
                            <li className="nav__item">
                                <Link className={darkClass}  to='/collections'>Коллекции</Link>
                            </li>
                            <li className="nav__item">
                                <Link className={darkClass}  to='/about'>О музее</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__control-btns btns-group">
                        <button className={`btns-group__btn ${darkClass}`}>
                            <Link className={darkClass} to='/admin'>Управление</Link>
                        </button>
                        <button className={`btns-group__btn ${darkClass}`}>
                            <Link className={darkClass} to='/user'>Личный кабинет</Link>
                        </button>
                        <button  onClick={toggle}  className={`btns-group__btn ${darkClass}`}>
                            Войти
                            <img src={smallArrow} alt="smallArrow"/>
                        </button>      
                    </div>
                </div>
            </Container>
            <LogInModal isOpen={isOpen} toggle={toggle}/>       
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(Header);