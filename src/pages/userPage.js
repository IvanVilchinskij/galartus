import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import UserAccount from '../components/userAccount/userAccount';

const UserPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    return (    
        <UserAccount/>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
    }
};

export default connect(mapStateToProps, actions)(UserPage);