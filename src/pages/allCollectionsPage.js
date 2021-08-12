import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Collcetions from '../components/collections/collections';

const AllCollectionsPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (    
        <div className='collection'>
            <div className='container'>
                <h2 className="collection__title title page-title">Коллекции</h2>
                <Collcetions/>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AllCollectionsPage);