import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import '../styles/pages/aboutPage.scss';

import * as actions from '../actions/actions';
import AboutInfo from '../components/aboutInfo/aboutInfo';
import Map from '../components/map/map';

const AboutPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (    
        <div className="about">
            <div className='container'>
                <AboutInfo/>
            </div>
            <Map/>
        </div>     
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AboutPage);