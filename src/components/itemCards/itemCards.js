import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import './itemCards.scss';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';
import Spinner from '../spinner/spinner';

const ItemCards = ({pictures, picturesLoaded, collectionId, picturesError, currentCollection, picturesRequsted, isLoadingPictures, isErrorPictures, isAutorization, setLikesId, likesId}) => {

    useEffect(() => {
        picturesRequsted();

        if (localStorage.getItem('access_token')) { 
            axiosInstance.get('likes')
                .then((res) => {
                    setLikesId(res.data);
                });
        } 

        axiosInstance.get(`pictures?categories=${collectionId}`)
            .then(res => {
                picturesLoaded(res.data);
            })
            .catch(() => {
                picturesError();
            });

        return function cleanup() {
            picturesLoaded([]);
        }

    }, []);

    const HandleLike = (itemId, e) => {
        const target = e.target;

        if (target.classList.contains('active-like')) {
            target.classList.remove('active-like');

            axiosInstance.delete(`likes/${itemId}/delete`)
                .then(() => {
                    console.log('delete');
                })
                .catch((err) => {
                    
                    console.log(err);
                    target.classList.add('active-like');
                });
        } else {
            const formData = new FormData();

            if (itemId) {
                formData.append('picture', itemId);
            }

            target.classList.add('active-like');

            axiosInstance.post('likes/create', formData)
                .then(() => {
                    console.log('add');
                })
                .catch(() =>{
                    console.log('Error');
                    target.classList.remove('active-like');
                });
        }
        
        
    };

    const picturesCards = pictures ?  pictures.map((item) => {
        let likeClass = '';

        if (likesId && likesId.size !== 0) {
            likeClass = likesId.has(item.id) ? 'active-like' : '';
        }

        const likeBtn = isAutorization ? <Button 
                                            onClick={(e) => {
                                                HandleLike(item.id, e);
                                            }} 
                                            className={`item-card__like-btn ${likeClass}`}
                                        >
                                            Like
                                        </Button> : null;

        return (
            <Card key={item.id} className='item-card'>
                <div className="item-card__img">
                    <CardImg 
                        top 
                        width="100%" 
                        src={item.image} 
                        alt={item.name} 
                    />
                </div>     
                <CardBody className='item-card__body'>
                    <CardTitle className='item-card__title' tag="h5">{item.name}</CardTitle>
                    <CardText className='item-card__text'>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </CardText>
                    <Button><Link to={`/pictures/${item.id}`}>Подробнее</Link></Button>
                    {likeBtn}
                </CardBody>
            </Card>
        );
    }) : null;


    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    const content = !isLoadingPictures && !isErrorPictures ? picturesCards : null;

    return (
        <div className="collection-page__wrapper">  
            {loadingContent}
            {content}
            {errorContent}
        </div>
    );
};

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <Spinner/>
        </div>
    );
};

const ErrorCard = () => {
    return (
        <div className="error-card">
            Error
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.pictures,
        isLoadingPictures: state.isLoadingPictures,
        isErrorPictures: state.isErrorPictures,
        currentCollection: state.currentCollection,
        likesId: state.likesId,
        isAutorization: state.isAutorization,
    }
};

export default connect(mapStateToProps, actions)(ItemCards);