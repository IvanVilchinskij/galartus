import React, {useState, useEffect} from 'react';
import {
        Nav, 
        NavItem, 
        NavLink, 
        TabContent, 
        TabPane, 
    } from 'reactstrap';
import classnames from 'classnames';

import './userAccount.scss';

import axiosInstance from '../../axios';
import EditUserModal from './editUserModal/editUserModal';
import UserLikes from './userLikes/userLikes';
import UserReccomendation from './userRecommendation/userRecommendation';
import { transformDate } from '../../dateTransform/dateTransform';
import db from '../../db';
import avatar from '../../images/user/no-avatar.jpg';

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
        /* axiosInstance.get(`users/`)
            .then(res => {
                setUserInfo(res.data[0]);
            }); */
        setUserInfo(db.user[0]);
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
            <div className='container'>
                <div className="user-account__wrapper">
                    {content}
                    <div className="tabs-wrapper">
                        <Nav tabs className='custom-tabs'>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Мне понравилось
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Подборка выставок
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <UserLikes/>
                            </TabPane>
                            <TabPane tabId="2">
                                <UserReccomendation/>
                            </TabPane>
                        </TabContent>
                    </div>    
                </div>
                
            </div>
            
        </div>
    );   
};

const UserCard = ({user, toggle, isOpen, toggleRefresh}) => {
    const birthday = transformDate(user.birthday)

    return (
        <div className='user'>
            <div className="user__header">
                <img src={user.image ? user.image : avatar} alt={user.first_name} />
            </div>
            <div className="user__body">
                <h2 className="user__name title">{user.first_name} {user.last_name}</h2>
                <h3 className="user__birthday">{birthday}</h3>
                <div className="user__mail">{user.email}</div>
            </div>
            <div className="user__footer">
                <button onClick={toggle} className="user__edit">Редактировать</button>
            </div>
            <EditUserModal refresh={toggleRefresh} userId={user.id} isOpen={isOpen} toggle={toggle}/>
        </div>
    );
    
};

const EmptyData = () => {
    return (
        <p>Нет данных о пользователе...</p>
    );
}

export default UserAccount;