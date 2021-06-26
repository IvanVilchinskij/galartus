import React, { useEffect, /* useState */ } from 'react';
import {connect} from 'react-redux';
import {Card, 
        CardTitle, 
        Button,
} from 'reactstrap';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/actions';
import axiosInstance from '../../axios';
import Spinner from '../spinner/spinner';

import './collections.scss';

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
                        <Card className='collection-card' key={item.id} body>
                            <div className="collection-card__content-wrapper">
                                <div className="collection-card__img">
                                    <img src={item.image} alt={item.name}/>                       
                                </div>     
                                <CardTitle className='collection-card__title'>{item.name}</CardTitle>
                            </div>       
                            <Button>
                                <Link to={`/collections/${item.id}`}>Подробнее</Link>
                            </Button>
                        </Card>
                    );
                })
            );
            
        }
    };
    

    const collectionsCards = collections ? setItemsContent(collections) : null;
    
    const loadingContent = isLoadingCollections ? <LoadingCard/> : null;

    const errorContent = isErrorCollcetions ? <ErrorCard/> : null;

    const content = !isLoadingCollections && !isErrorCollcetions ? collectionsCards : null;

    return (
        <div className="collection__flex-wrapper">
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
        collections: state.collections,
        isLoadingCollections: state.isLoadingCollections,
        isErrorCollcetions: state.isErrorCollcetions,
    }
};

export default connect(mapStateToProps, actions)(Collections);