import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import ExhibitionsList from '../components/exhibitionsList/exhibitionsList';


const ExhibitionsPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (      
        <ExhibitionsList/>  
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
    }
};

export default connect(mapStateToProps, actions)(ExhibitionsPage);