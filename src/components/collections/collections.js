import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import {Card, 
        CardTitle, 
        Button,
} from 'reactstrap';
import {Link} from 'react-router-dom';

import * as actions from '../../actions/actions';
import WithMuseamService from '../hoc/withMuseamService';
import Spinner from '../spinner/spinner';

import './collections.scss';

const Collections = ({
    MuseamService, 
    collectionsLoaded, 
    collections, 
    collectionsRequsted,  
    isLoadingCollections, 
    isErrorCollcetions, 
    collectionsError, 
    defCurrentCollection
}) => {
    useEffect(() => {
        collectionsRequsted();

        MuseamService.getList('/categories')
            .then(res => {    
                collectionsLoaded(res);
            })
            .catch(() => {
                collectionsError();
            });

        return function cleanup() {
            collectionsLoaded([]);
        }
    }, []);
    

    const collectionsCards = collections ? collections.map((item) => {
        return (
            <Card className='collection-card' key={item.id} body>
                <div className="collection-card__content-wrapper">
                    <div className="collection-card__img">
                        <img src={item.image} alt={item.name}/>                       
                    </div>     
                    <CardTitle className='collection-card__title'>{item.name}</CardTitle>
                </div>       
                <Button>
                    <Link onClick={() => defCurrentCollection(item.id)} to={`/collections/${item.id}`}>Подробнее</Link>
                </Button>
            </Card>
        );
    }) : null;
    
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
        currentCollection: state.currentCollection
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(Collections));