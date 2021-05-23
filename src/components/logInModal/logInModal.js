import React, {useState} from 'react';
import {  
    Modal, 
    ModalHeader, 
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux';

import * as actions from '../../actions/actions';
import LogIn from './logIn/logIn';
import Register from './register/register';

const LogInModal = ({isOpen, toggle, setAutorization}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };
    
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggleTab('1'); }}
                        >
                            Вход
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggleTab('2'); }}
                        >
                            Регистрация
                        </NavLink>
                    </NavItem>
                </Nav>
            </ModalHeader>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <LogIn 
                        toggle={toggle} 
                        setAutorization={setAutorization}
                    />
                </TabPane>
                <TabPane tabId="2">
                    <Register 
                        toggle={toggle} 
                        setAutorization={setAutorization}
                    />
                </TabPane>
            </TabContent> 
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(LogInModal);