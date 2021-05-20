import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import './userLikes.scss';

import axiosInstance from '../../../axios';

const UserLikes = () => {
    const [likes, setLikes] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => setRefresh(!refresh);

    useEffect(() => {
        axiosInstance.get('likes')
            .then(res => {
                setLikes(res.data);
                console.log(res.data);
            } )
            .catch((err) => console.log(err));
    }, [refresh]);

    const handleDelete = (itemId) => {
        axiosInstance.delete(`likes/${itemId}/delete`)
            .then(() => toggleRefresh())
            .catch((err) => console.log(err));
    };

    const likesCards = likes.length > 0 ? likes.map(item => {
        return (
            <div key={item.id} className="like-card">
                <div className="like-card__img">
                    <img src={`http://217.66.18.54:8000${item.picture.image}`} alt={item.picture.name}/>
                </div>
                <div className="like-card__name">{item.picture.name}</div>
                <Button><Link to={`/pictures/${item.picture.id}`}>Открыть</Link></Button>
                <Button onClick={() => handleDelete(item.picture.id)}>Убрать из лайков</Button>
            </div>
        );
    }) : <h3>Тут пусто</h3>;

    return (
        <div className="likes">
            {likesCards}
        </div>
        
    );
};

export default UserLikes;