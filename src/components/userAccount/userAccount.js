import React, {useState, useEffect} from 'react';
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

import axiosInstance from '../../axios';
import EditUserModal from './editUserModal/editUserModal';

const UserAccount = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const [activeTab, setActiveTab] = useState('1');

    const [refresh, setRefresh] = useState();

    const toggleRefresh = () => setRefresh(!refresh);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    const toggleEditModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        const login = localStorage.getItem('login');

        if (login) {
            axiosInstance.get(`users/?email=${login}`)
                .then(res => {
                    setUserInfo(res.data[0])
                });
        }
    }, [refresh]);

    const content = userInfo ? 
    <UserCard 
        isOpen={isOpen} 
        user={userInfo} 
        toggle={toggleEditModal}
        toggleRefresh={toggleRefresh}
    /> : 
    <EmptyData/>;
    
    return (
        <div className="user-account">
            <Container>
                {content}
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

const UserCard = ({user, toggle, isOpen, toggleRefresh}) => {
    return (
        <Card className='user'>
            <h2 className="user__title">Информация о пользователе</h2>
            <ul className="user__info-list">
                <li className="user__list-item">
                    <div className="user__item-name">Имя</div>
                    <div className="user__item-value">{user.first_name}</div>     
                </li>
                <li className="user__list-item">
                    <div className="user__item-name">Фамилия</div>
                    <div className="user__item-value">{user.last_name}</div>
                </li>
                <li className="user__list-item">
                    <div className="user__item-name">Почта</div>
                    <div className="user__item-value">{user.email}</div>
                </li>
                <li className="user__list-item">
                    <div className="user__item-name">День рождения</div>
                    <div className="user__item-value">{user.birthday}</div>
                </li>
            </ul>
            <Button onClick={toggle}>Редактировать профиль</Button>
            <EditUserModal refresh={toggleRefresh} userId={user.id} isOpen={isOpen} toggle={toggle}/>
        </Card>
    );
    
};

const EmptyData = () => {
    return (
        <p>Нет данных о пользователе...</p>
    );
}

export default UserAccount;