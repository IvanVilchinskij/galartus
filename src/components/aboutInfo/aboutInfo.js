import React from 'react';

import './about-info.scss';

import AboutSlider from './aboutSlider/aboutSlider';
import AboutText from './aboutText/aboutText';

const AboutInfo = () => {
    return (
        <div className="about-info">
            <AboutSlider/>
            <AboutText/>
        </div>
    )
};

export default AboutInfo;