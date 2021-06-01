import React, {useState} from 'react';
import { 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink 
} from 'reactstrap';
import classnames from 'classnames';

import './adminControl.scss';

import AdminCollections from './collcetions/adminCollections';
import AdminPictures from './pictures/adminPictures';
import AdminExhibitions from './exhibitions/adminExhibitions';

const AdminControl = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className='admin-control'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Collections
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Exhibitions
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Pictures
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <AdminCollections/>
                </TabPane>
                <TabPane tabId="2">
                    <AdminExhibitions/>
                </TabPane>
                <TabPane tabId="3">
                    <AdminPictures/>
                </TabPane>
            </TabContent>
        </div>
    )
};

export default AdminControl;