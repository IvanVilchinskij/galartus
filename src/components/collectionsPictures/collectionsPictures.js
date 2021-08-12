import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Masonry from 'react-masonry-css';

import './collectionsPictures.scss';

import axiosInstance from '../../axios';
import * as actions from '../../actions/actions';
import Spinner from '../spinner/spinner';
import icons from '../../icons/icons.svg';

import db from '../../db';

const CollectionsPictures = ({pictures, picturesLoaded, collectionId, picturesError, picturesRequsted, isLoadingPictures, isErrorPictures, isAutorization, setLikesId, likesId}) => {

    useEffect(() => {
        /* picturesRequsted();

        if (localStorage.getItem('access_token')) { 
            axiosInstance.get('likes')
                .then((res) => {
                    setLikesId(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }  */

        /* axiosInstance.get(`pictures?categories=${collectionId}`)
            .then(res => {
                picturesLoaded(res.data);
            })
            .catch(() => {
                picturesError();    
            });

        return function cleanup() {
            picturesLoaded([]);
        } */

        picturesLoaded(db.pictures);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = (itemId, e) => {
        const target = e.target.closest('.picture-card__like-btn');

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

    const filterPictures = pictures ? pictures.filter((item) => {
        return item.categories.includes(collectionId);
    }) : null;

    const picturesCards = filterPictures && filterPictures.length !== 0 ?  pictures.map((item) => {
        let likeClass = '';

        if (likesId && likesId.size !== 0) {
            likeClass = likesId.has(item.id) ? 'active-like' : '';
        }

        const likeBtn = isAutorization ? <LikeIcon 
                                            itemId={item.id} 
                                            handleLike={handleLike}  
                                            likeClass={likeClass}
                                        /> : null;

        return (
            <div key={item.id} className='picture-card'>
                <Link to={`/galartus_front/pictures/${item.id}`} className='picture-card__content'>
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
                {likeBtn}
            </div>  
        );
        
    }) : <EmptyData/>;

    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    const content = !isLoadingPictures 
                    && !isErrorPictures ? picturesCards : null;

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

const LikeIcon = ({likeClass, handleLike, itemId}) => {
    return (
        <svg onClick={(e) => handleLike(itemId, e)} className={`picture-card__like-btn ${likeClass}`}>
            <use href={`${icons}#like`}></use>
        </svg>
    )
};

const EmptyData = () => {
    return (
        <div className="empty-data">
            Пусто
        </div>
    )
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