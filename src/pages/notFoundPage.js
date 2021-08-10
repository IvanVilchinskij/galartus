import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';

const NotFoundPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="not-found-page">
            <div className="container">
                
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        
    }
};

export default connect(mapStateToProps, actions)(NotFoundPage);