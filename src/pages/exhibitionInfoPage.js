import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import ExhibitionInfo from '../components/exhibitionInfo/exhibitionInfo';
import * as actions from '../actions/actions';

const ExhibitionInfoPage = ({toggleHeaderColor, isAutorization}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    const {id} = useParams();

    return (
        <ExhibitionInfo isAutorization={isAutorization} exhibitionId={id}/>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(ExhibitionInfoPage);