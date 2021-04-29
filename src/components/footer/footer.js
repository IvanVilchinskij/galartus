import React from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link} from 'react-router-dom';

import './footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
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
            
        </footer>
    );  
};

export default Footer;