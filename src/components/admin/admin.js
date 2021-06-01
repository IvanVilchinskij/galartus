import React, {useState} from 'react';
import { 
    Container, 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink 
} from 'reactstrap';
import classnames from 'classnames';

import './admin.scss';

import AdminPayment from './adminPayment/adminPayment';
import AdminControl from './adminControl/adminControl';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className="admin">
            <Container>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Управление контентом
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Билеты на выставки
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <AdminControl/>
                    </TabPane>
                    <TabPane tabId="2">
                        <AdminPayment/>
                    </TabPane>
                </TabContent>
            </Container>
        </div>
    );
};

export default Admin;