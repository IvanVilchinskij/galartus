import React from 'react';
import { Container } from 'reactstrap';
import { Link} from 'react-router-dom';

import './footer.scss';

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <div className="footer__flex-wrapper">
                    <div className="footer__logo">
                        <div className="footer__logo-name">
                            <Link to='/'>Galartus</Link>            
                        </div>
                        <div className="footer__logo-year">2021</div>
                    </div>
                    <div className="footer__nav">
                        <ul className="footer__nav-list">
                            <li className="footer__nav-link">
                                <Link to='/exhibitions'>Выставки</Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/collections'>Коллекция</Link>
                            </li>
                            <li className="footer__nav-link">
                                <Link to='/about'>О музее</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__contacts">
                        <div className="footer__contacts-title">Контакты</div>
                        <ul className="footer__contacts-list">
                            <li className="footer__contacts-item">Казань, Карла Маркса, 57</li>
                            <li className="footer__contacts-item">+7 (843) 223-45-40</li>
                            <li className="footer__contacts-item">info@gallartus.ru</li>
                        </ul>
                    </div>
                </div>
            </Container>
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