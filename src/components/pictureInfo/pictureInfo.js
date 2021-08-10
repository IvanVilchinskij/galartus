import React, { useState, useEffect } from 'react';

import './pictureInfo.scss';

import db from '../../db';

const PictureInfo = ({pictureId}) => {
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        db.pictures.forEach(item => {
            if (item.id === +pictureId) {
                setPicture(item);
            }
        })
    }, []);

    const pictureInfo = picture ? <Picture item={picture}/> : null;

    return (
        <div className="container">
            {pictureInfo}
        </div>
    )
};

const Picture = ({item}) => {
    return (
        <div key={item.id} className="picture-info">
            <div className="picture-info__img">
                <img src={item.image} alt={item.name}/>
            </div>
            <div className="picture-info__info">
                <div className="picture-info__title title page-title">
                    <h2 className="picture-info__name">{item.author.trim()}</h2>
                    <h3 className="picture-info__author">«{item.name.trim()}»</h3>
                </div>
                <div className="picture-info__descr">
                    {item.description}
                </div>
            </div>
        </div>
    )
};

export default PictureInfo;