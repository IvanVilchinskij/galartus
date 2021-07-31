import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Masonry from 'react-masonry-css';

import './userLikes.scss';

import axiosInstance from '../../../axios';
import icons from '../../../icons/icons.svg';

const UserLikes = () => {
    const [likes, setLikes] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => setRefresh(!refresh);

    useEffect(() => {
        /* axiosInstance.get('likes')
            .then(res => {
                if (res.data) {

                    setLikes(res.data);
                }
            } )
            .catch((err) => console.log(err)); */
    }, []);

    const handleDelete = (e, itemId) => {
        const target = e.target.closest('.picture-card');

        target.remove();

        axiosInstance.delete(`likes/${itemId}/delete`)
            .then(() =>{
                toggleRefresh();
            })
            .catch((err) => console.log(err));
    };

    const breakpoints ={
        default: 3,
        1100: 2,
        700: 1,
    };


    const likesCards = likes.length > 0 ? likes.map(item => {
        return (
            <div key={item.id} className='picture-card picture-card--xs'>
                <Link to={`/pictures/${item.picture.id}`} className='picture-card__content'>
                    <div className="picture-card__img">
                        <img src={item.picture.image} alt={item.picture.name} />
                    </div>
                    
                    <div className="picture-card__title title">
                        <div className="picture-card__name">
                            {item.picture.author} "{item.picture.name}"
                        </div>
                        <svg className="picture-card__arrow">
                            <use href={`${icons}#arrow`}></use>
                        </svg>
                    </div>
                </Link>
                <LikeIcon 
                    itemId={item.picture.id} 
                    handleDelete={handleDelete}  
                />
            </div>
        );
    }) : <h3>Пусто</h3>;

    return (
        <Masonry 
            breakpointCols={breakpoints}
            className="likes__grid"
            columnClassName="likes__grid_column"
        >
            {likesCards}
        </Masonry>
        
    );
};

const LikeIcon = ({handleDelete, itemId}) => {
    return (
        <svg onClick={(e) => handleDelete(e, itemId)} className={`picture-card__like-btn active-like`}>
            <use href={`${icons}#like`}></use>
        </svg>
    )
};

export default UserLikes;