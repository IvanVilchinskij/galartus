import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Slider from '../components/slider/slider';
import ComingEvents from '../components/comingEvents/comingEvents';
import Map from '../components/map/map';

const MainPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(false);

        window.scroll(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Slider/>
            <ComingEvents/>   
            <Map/> 
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(MainPage);