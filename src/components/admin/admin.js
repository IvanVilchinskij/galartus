import React, {useState, useEffect, useLayoutEffect} from 'react';
import { 
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
    const [isBr, setIsBr] = useState(true);
    const [size, setSize] = useState([0, 0]);
    
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        
        window.addEventListener('resize', updateSize);
        updateSize();
    
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;

        if (clientWidth < 576) {
            setIsBr(false);
        } else {
            setIsBr(true);
        }

    }, [size])

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className='container tabs-wrapper'>
            <Nav className='first-tabs' tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Управление {!isBr ? <br/> : null}контентом
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Билеты {!isBr ? <br/> : null}на выставки
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='first-tabs-content' activeTab={activeTab}>
                <TabPane tabId="1">
                    <AdminControl/>
                </TabPane>
                <TabPane tabId="2">
                    <AdminPayment/>
                </TabPane>
            </TabContent>
        </div>
    );
};

export default Admin;