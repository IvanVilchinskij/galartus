import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Masonry from 'react-masonry-css';

import './collectionsPictures.scss';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';
import Spinner from '../spinner/spinner';
import icons from '../../icons/icons.svg';

const CollectionsPictures = ({pictures, picturesLoaded, collectionId, picturesError, picturesRequsted, isLoadingPictures, isErrorPictures, isAutorization, setLikesId, likesId}) => {

    useEffect(() => {
        picturesRequsted();

        if (localStorage.getItem('access_token')) { 
            axiosInstance.get('likes')
                .then((res) => {
                    setLikesId(res.data);
                })
                .catch(err => {
                    console.log(err);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const HandleLike = (itemId, e) => {
        const target = e.target;

        if (target.classList.contains('active-like')) {
            target.classList.remove('active-like');

            axiosInstance.delete(`likes/${itemId}/delete`)
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
            <Link to={`/pictures/${item.id}`} key={item.id} className='picture-card'>
                <div className="picture-card__img">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="picture-card__title title">
                    <div className="picture-card__name">
                        {item.author} "{item.name}"
                    </div>
                    <svg className="picture-card__arrow">
                        <use href={`${icons}#arrow`}></use>
                    </svg>
                </div>
            </Link>
        );
    }) : null;


    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    const content = !isLoadingPictures && !isErrorPictures ? picturesCards : null;

    const breakpoints ={
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <Masonry
            breakpointCols={breakpoints}
            className="pictures__grid"
            columnClassName="pictures__grid_column"
        > 
            {loadingContent}
            {content}
            {errorContent}
        </Masonry>
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

export default connect(mapStateToProps, actions)(CollectionsPictures);