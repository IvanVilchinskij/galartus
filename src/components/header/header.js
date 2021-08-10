import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LogInModal from '../logInModal/logInModal';
import LogOutModal from '../logOutModal/logOutModal';
import * as actions from '../../actions/actions';

import smallWhiteArrow from './img/smalWhiteArrow.svg';
import smallBlackArrow from './img/smalBlackArrow.svg';
import icons from '../../icons/icons.svg';

import './header.scss';

const Header = ({darkHeader, isAutorization}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenExit, setIsOpenExit] = useState(false);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const darkClass = darkHeader ? 'dark-color' : '';
    const noTransparentBG = darkHeader ? 'header-bg' : '';

    const smallArrow = darkHeader ? smallBlackArrow : isMobile ? smallBlackArrow : smallWhiteArrow;

    const toggle = () => setIsOpen(!isOpen);
    const toggleExit = () => setIsOpenExit(!isOpenExit);

    const toggleBurger = () => setIsOpenBurger(!isOpenBurger);

    const checkIsMobile = () => {
        const clientWidth = document.documentElement.clientWidth,
              scrollBarWidth = getScrollbarWidth();

        if (clientWidth + scrollBarWidth < 992 ) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        checkIsMobile();
    }, []);

    const toggleMenu = () => {
        const menu = document.querySelector('.header__control'),
              body = document.body;
        
        body.classList.toggle('open-menu');
        toggleBurger();
        menu.classList.toggle('active');

        if (body.classList.contains('open-menu')) {
            body.style.paddingRight = getScrollbarWidth() + 'px';
        } else {
            body.style.paddingRight = '';
        }
    };

    const handleClickSubstr = (e) => {
        const target = e.target.closest('.header__control'),
              burgerTarget = e.target.closest('.burger');

        if (!target && isOpenBurger && !burgerTarget) {
            toggleMenu();
        }
    };
    
    const handleClik = () => {
        const clientWidth = document.documentElement.clientWidth,
              scrollBarWidth = getScrollbarWidth(),
              isOpenMenu = document.body.classList.contains('open-menu');
     
        if (clientWidth + (isOpenMenu ? 0 : scrollBarWidth) < 992 ) {
            toggleMenu();
        } else {
            return;
        }
    };

    const headerEnterOrExit = !isAutorization ? 
        <LogInBtn toggle={toggle} darkClass={darkClass} smallArrow={smallArrow}/> : 
        <LogOutBtn toggleExit={toggleExit} darkClass={darkClass}/>;

    const headerUserBtns = /* isAutorization */ true ? 
                    <>
                        <AdminBtn handleClik={handleClik} darkClass={darkClass}/>
                        <UserPA handleClik={handleClik} darkClass={darkClass}/>
                    </> : null;

    const activeBurger = isOpenBurger ? 'active' : '';

    return (
        <header onClick={(e) => handleClickSubstr(e)} className={`header ${noTransparentBG}`}>
            <div className='header__flex-wrapper container'>
                <div className="header__logo title">
                    <Link className={darkClass} to='/'>Galartus</Link>
                </div>
                <div className="header__control">
                    <div className="header__logo title">
                        <Link onClick={handleClik} to='/'>Galartus</Link>
                    </div>
                    <nav className="header__nav nav">
                        <ul className="nav__list">
                            <li className="nav__item nav__item--menu">
                                <Link onClick={handleClik} className={darkClass}  to='/'>
                                    <span>Главная</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link onClick={handleClik} className={darkClass}  to='/exhibitions'>
                                    <span>Выставки</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link onClick={handleClik} className={darkClass}  to='/collections'>
                                    <span>Коллекции</span>
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link onClick={handleClik} className={darkClass}  to='/about'>
                                    <span>О музее</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__control-btns btns-group">
                        {headerUserBtns}
                        {headerEnterOrExit}
                    </div>
                </div>
                <div className={`burger ${darkClass} ${activeBurger}`} onClick={toggleMenu}>
                    <span className='burger__upper-line'></span>
                    <span className='burger__middle-line burger__middle-line--upper'></span>
                    <span className='burger__middle-line burger__middle-line--down'></span>
                    <span className='burger__down-line'></span>
                </div>
            </div>
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
    const color = darkClass ? 'black-' : 'white-';

    return (
        <svg  onClick={toggleExit}  className={`logout-icon`}>
            <use href={`${icons}#${color}exit`}></use>
        </svg> 
    );
};

const AdminBtn = ({darkClass, handleClik}) => {
    return (
        <button className={`btns-group__btn ${darkClass}`}>
            <Link onClick={handleClik} className={darkClass} to='/admin'>Управление</Link>
        </button>
    );
};

const UserPA = ({darkClass, handleClik}) => {
    return (
        <button className={`btns-group__btn ${darkClass}`}>
            <Link onClick={handleClik} className={darkClass} to='/user'>Личный кабинет</Link>
        </button> 
    );
};

function getScrollbarWidth() {

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar'; 
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);
  
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);
  
    return scrollbarWidth;
  
}

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(Header);