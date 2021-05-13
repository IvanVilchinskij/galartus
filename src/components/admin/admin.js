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

import AdminCollections from '../adminControl/collcetions/adminCollections';
import AdminPictures from '../adminControl/pictures/adminPictures';
import AdminExhibitions from '../adminControl/exhibitions/adminExhibitions';

const AdminControl = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className="admin">
            <Container>
                <h3 className="admin__title">Управление контентом</h3>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Collection
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Exhibition
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
            </Container>
        </div>
    );
};

export default AdminControl;