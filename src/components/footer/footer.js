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
                            <Link to='/'>Galartus</Link>            
                        </div>
                        <div className="footer__logo-year">2021</div>
                    </div>
                    <div className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-link">
                                <Link to='/exhibitions'>
                                    <span>Выставки</span> 
                                </Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/collections'>
                                    <span>Коллекции</span> 
                                </Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/about'>
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


/* <footer className='footer'>
            <Navbar 
                className='footer__navbar navbar' 
                expand='lg' 
                dark 
                color='dark'
            >
                <Container>
                    <NavbarBrand href='/' className='navbar__logo'>Галартус</NavbarBrand>
                    <Nav className='ml-auto navbar__nav'>
                        <NavItem className='navbar__item'>
                            <Link to='/'>Главная страница</Link>
                        </NavItem>
                        <NavItem className='navbar__item'>
                            <Link to='/exhibitions'>Выставки</Link>
                        </NavItem>
                        <NavItem className='navbar__item'>
                            <Link to='/collections'>Коллекция</Link>
                        </NavItem>
                        <NavItem className='navbar__item'>
                            <Link to='/about'>О музее</Link>
                        </NavItem>              
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <div className="footer__info">                  
                    <h4><a href="tel:+78005553535">8-800-555-35-35</a></h4>
                    <h4><a href="mailto:qweqr@muzia.su">qweqr@muzia.su</a></h4>                             
                </div>
            </Container>
            
        </footer> */