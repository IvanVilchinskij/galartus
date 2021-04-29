import React from 'react';

import './map.scss';

const Map = () => {
    return (
        <div className="map">
            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17946.671958700725!2d49.093792928857084!3d55.78743812806881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415ead219941ae53%3A0x5b0126a895b9ce7d!2z0JrQsNC30LDQvdGB0LrQuNC5INC60YDQtdC80LvRjA!5e0!3m2!1sru!2sru!4v1617035864836!5m2!1sru!2sru" loading="lazy"></iframe>
        </div>
    );
};

export default Map;