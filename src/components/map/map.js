import React, { useState, useEffect, useLayoutEffect } from 'react';
import './map.scss';

const Map = () => {
    const [isBr, setIsBr] = useState(true);
    
    const [size, setSize] = useState([0, 0]);
    
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        
        window.addEventListener('resize', updateSize);
        updateSize();
    
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;

        if (clientWidth < 768) {
            setIsBr(false);
        } else {
            setIsBr(true);
        }
    }, [size]);
    

    return (
        <div className="map">
            <div className='container'>
                <div className="map__flex-wrapper">
                    <div className="map__contacts">
                        <div className="map__title title">
                            Наши 
                            {isBr ? <br/> : ' '}
                            контакты
                        </div>
                        <div className="map__info">
                            <div className="map__info-item">
                                Казань, Карла Маркса, 57
                            </div>
                            <div className="map__info-item">
                                <a href="tel:+78432234540">+7 (843) 223-45-40</a>
                            </div>
                            <div className="map__info-item">
                                <a href="mailto:info@gallartus.ru">info@gallartus.ru</a>     
                            </div>
                            <div className="map__info-item">
                                Факс: +7 843 223-40-40
                            </div>
                        </div>
                    </div>
                    <div className="map__frame">
                        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.867002300653!2d49.13377195193049!3d55.795547280469485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead6cef895d73%3A0x2d9ec991f30a540f!2z0YPQuy4g0JrQsNGA0LvQsCDQnNCw0YDQutGB0LAsIDU3LCDQmtCw0LfQsNC90YwsINCg0LXRgdC_LiDQotCw0YLQsNGA0YHRgtCw0L0sIDQyMDAxNQ!5e0!3m2!1sru!2sru!4v1620655192330!5m2!1sru!2sru" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Map;