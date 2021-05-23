import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import AdminControl from '../components/admin/admin';

const AdminPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (      
        <AdminControl/>           
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AdminPage);