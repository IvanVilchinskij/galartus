import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';

const NotFoundPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    return (
        <p>Страница не найдена</p>
    );
};

const mapStateToProps = (state) => {
    return {
        
    }
};

export default connect(mapStateToProps, actions)(NotFoundPage);