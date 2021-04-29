import React, {useState} from 'react';
import {
        Container, 
        Card, 
        Nav, 
        NavItem, 
        NavLink, 
        TabContent, 
        TabPane, 
        Row, 
        Col,
        Button
    } from 'reactstrap';
import classnames from 'classnames';

import './userAccount.scss';

const UserAccount = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className="user-account">
            <Container>
                <Card className='user'>
                    <h2 className="user__title">Информация о пользователе</h2>
                    <ul className="user__info-list">
                        <li className="user__list-item">
                            <div className="user__item-name">Имя</div>
                            <div className="user__item-value">Name</div>
                        </li>
                        <li className="user__list-item">
                            <div className="user__item-name">Ник</div>
                            <div className="user__item-value">NikName</div>
                        </li>
                        <li className="user__list-item">
                            <div className="user__item-name">Почта</div>
                            <div className="user__item-value">example@mm.com</div>
                        </li>
                    </ul>
                </Card>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Мои лайки
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Подборка
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <h4>Тут пока пусто</h4>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">                           
                                <Button>Подобрать</Button>
                            </Col>                          
                        </Row>
                    </TabPane>
            </TabContent>
            </Container>
        </div>
    );
};

export default UserAccount;