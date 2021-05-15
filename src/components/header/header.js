import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { Container} from 'reactstrap';
import {Link} from 'react-router-dom';

import LogInModal from '../logInModal/logInModal';
import LogOutModal from '../logOutModal/logOutModal';
import * as actions from '../../actions/actions';

import smallWhiteArrow from './img/smalWhiteArrow.svg';
import smallBlackArrow from './img/smalBlackArrow.svg';

import './header.scss';

const Header = ({darkHeader, isAutorization}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenExit, setIsOpenExit] = useState(false);

    const [isOpenBurger, setIsOpenBurger] = useState(false);

    const darkClass = darkHeader ? 'dark-color' : '';

    const smallArrow = darkHeader ? smallBlackArrow : smallWhiteArrow;

    const toggle = () => setIsOpen(!isOpen);
    const toggleExit = () => setIsOpenExit(!isOpenExit);

    const toggleBurger = () => setIsOpenBurger(!isOpenBurger);

    const headerEnterOrExit = !isAutorization ? 
        <LogInBtn toggle={toggle} darkClass={darkClass} smallArrow={smallArrow}/> : 
        <LogOutBtn toggleExit={toggleExit} darkClass={darkClass}/>;

    const headerUserBtns = isAutorization ? <><AdminBtn darkClass={darkClass}/><UserPA darkClass={darkClass}/></> : null;

    const activeBurger = isOpenBurger ? 'active' : '';

    return (
        <header className='header'>
            <Container className='header__flex-wrapper'>
                <div className="header__logo">
                    <Link className={darkClass} to='/'>Galartus</Link>
                </div>
                <div className="header__control">
                    <nav className="header__nav nav">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <Link className={darkClass}  to='/exhibitions'>
                                    <span>Выставки</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link className={darkClass}  to='/collections'>
                                    <span>Коллекции</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link className={darkClass}  to='/about'>
                                    <span>О музее</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__control-btns btns-group">
                        {/* <button className={`btns-group__btn ${darkClass}`}>
                            <Link className={darkClass} to='/admin'>Управление</Link>
                        </button>
                        <button className={`btns-group__btn ${darkClass}`}>
                            <Link className={darkClass} to='/user'>Личный кабинет</Link>
                        </button>   */}
                        {headerUserBtns}
                        {headerEnterOrExit}
                    </div>
                </div>
                <div className={`burger ${activeBurger}`} onClick={toggleBurger}>
                    <span className='burger__upper-line'></span>
                    <span className='burger__middle-line burger__middle-line--upper'></span>
                    <span className='burger__middle-line burger__middle-line--down'></span>
                    <span className='burger__down-line'></span>
                </div>
            </Container>
            <LogInModal isOpen={isOpen} toggle={toggle}/> 
            <LogOutModal isOpenExit={isOpenExit} toggleExit={toggleExit}/>      
        </header>
    );
};

const LogInBtn = ({toggle, darkClass, smallArrow}) => {
    return (
        <button  onClick={toggle}  className={`btns-group__btn ${darkClass}`}>
            Войти
            <img src={smallArrow} alt="smallArrow"/>
        </button> 
    );
};

const LogOutBtn = ({toggleExit, darkClass}) => {
    return (
        <button  onClick={toggleExit}  className={`btns-group__btn ${darkClass}`}>
            Выйти
        </button> 
    );
};

const AdminBtn = ({darkClass}) => {
    return (
        <button className={`btns-group__btn ${darkClass}`}>
            <Link className={darkClass} to='/admin'>Управление</Link>
        </button>
    );
};

const UserPA = ({darkClass}) => {
    return (
        <button className={`btns-group__btn ${darkClass}`}>
            <Link className={darkClass} to='/user'>Личный кабинет</Link>
        </button> 
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(Header);