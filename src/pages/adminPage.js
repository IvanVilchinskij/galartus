import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Admin from '../components/admin/admin';

const AdminPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (      
        <Admin/>           
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AdminPage);