import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, CardImg, CardBody, CardTitle, CardText, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import './itemCards.scss';

import WithMuseamService from '../hoc/withMuseamService';
import * as actions from '../../actions/actions';
import Spinner from '../spinner/spinner';

const ItemCards = ({MuseamService, pictures, picturesLoaded, collectionId, picturesError, currentCollection, picturesRequsted, isLoadingPictures, isErrorPictures}) => {
    useEffect(() => {
        picturesRequsted();

        MuseamService.getList('/pictures')
            .then(res => picturesLoaded(res))
            .catch((err) => {
                picturesError();
            });

        return function cleanup() {
            picturesLoaded([]);
        }
    }, []);

    const currentPictures = pictures ? pictures.filter((item) => {
        const itemCategories = item.categories;

        if (itemCategories.includes(collectionId)) {
            return true;
        } else {
            return false;
        }
    }) : null;

    const picturesCards = currentPictures ? currentPictures.map((item) => {
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
                    <Button><Link to={`/collections/${currentCollection}/pictures/${item.id}`}>Подробнее</Link></Button>
                </CardBody>
            </Card>
        );
    }) : null;

    const loadingContent = isLoadingPictures ? <LoadingCard/> : null;

    const errorContent = isErrorPictures ? <ErrorCard/> : null;

    const content = !isLoadingPictures && !isErrorPictures ? picturesCards : null;

    return (
        <>  
            {loadingContent}
            {content}
            {errorContent}
        </>
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
        currentCollection: state.currentCollection
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(ItemCards));