import React, {useEffect} from 'react';
import { Container } from 'reactstrap';
import {connect} from 'react-redux';

import '../styles/pages/aboutPage.scss';

import * as actions from '../actions/actions';
import AboutInfo from '../components/aboutInfo/aboutInfo';
import Map from '../components/map/map';

const AboutPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (    
        <div className="about">
            <Container>
                <AboutInfo/>
            </Container>
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