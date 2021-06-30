import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Masonry from 'react-masonry-css';

import './collections.scss';

import * as actions from '../../actions/actions';
import axiosInstance from '../../axios';
import Spinner from '../spinner/spinner';
import icons from '../../icons/icons.svg';

const Collections = ({ 
    collectionsLoaded, 
    collections, 
    collectionsRequsted,  
    isLoadingCollections, 
    isErrorCollcetions, 
    collectionsError
}) => {

    useEffect(() => {

        if (collections.length === 0) {
            collectionsRequsted();

            axiosInstance.get('categories')
                .then(res => {
                    collectionsLoaded(res.data);
                })
                .catch(() => collectionsError() );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setItemsContent = (items) => {
        if (items.length === 0) {
            return (
                <p>Тут пусто(</p>
            );
        } else {
            return (
                items.map((item) => {
                    return (
                        <Link to={`/collections/${item.id}`} className='collection-card' key={item.id}>   
                            <div className="collection-card__img">
                                <img src={item.image} alt={item.name}/>                       
                            </div> 
                            <div className="collection-card__title title">
                                {item.name}
                                <svg className="collection-card__arrow">
                                    <use href={`${icons}#arrow`}></use>
                                </svg>
                            </div>
                            
                        </Link>
                    );
                })
            );
            
        }
    };
    

    const collectionsCards = collections ? setItemsContent(collections) : null;
    
    const loadingContent = isLoadingCollections ? <LoadingCard/> : null;

    const errorContent = isErrorCollcetions ? <ErrorCard/> : null;

    const content = !isLoadingCollections && !isErrorCollcetions ? collectionsCards : null;

    const breakpoints ={
        default: 3,
        1100: 2,
        700: 1,
    }

    return (
        <Masonry 
            breakpointCols={breakpoints}
            className="collection__grid"
            columnClassName="collection__grid_column"
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
        collections: state.collections,
        isLoadingCollections: state.isLoadingCollections,
        isErrorCollcetions: state.isErrorCollcetions,
    }
};

export default connect(mapStateToProps, actions)(Collections);