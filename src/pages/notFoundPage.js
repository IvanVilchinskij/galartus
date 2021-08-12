import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';

const NotFoundPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="not-found-page">
            <div className="container">
                not-found
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        
    }
};

export default connect(mapStateToProps, actions)(NotFoundPage);