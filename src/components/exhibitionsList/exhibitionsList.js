import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    CardSubtitle,
    Container
  } from 'reactstrap';

import './exhibitionsList.scss';

import * as actions from '../../actions/actions';
import axiosInstance from '../../axios';
import Spinner from '../spinner/spinner';

const ExhibitionsList = ({exhibitionsLoaded, exhibitionsError, exhibitions, isLoadingExhibitions, isErrorExhibitions, exhibitionsRequsted}) => {

    useEffect(() => {
        exhibitionsRequsted();
        
        axiosInstance.get('exhibitions')
            .then(res => {
                exhibitionsLoaded(res.data);
            })
            .catch(() => exhibitionsError());

        return function cleanup() {
            exhibitionsLoaded([]);
        }
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
                        <Card key={item.id} className='exhibitions-card'>
                            <div className="exhibitions-card__img">
                                <CardImg top width="100%" src={item.image} alt={item.title} />
                            </div>
                            <CardBody>
                                <CardTitle tag="h5">{item.title}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{item.date}</CardSubtitle>
                                <CardText>
                                    <small className="text-muted">{item.address}</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    );
                })
            );    
        }
    };

    const exhibitionsCards = exhibitions ? setItemsContent(exhibitions) : null;

    const loadingContent = isLoadingExhibitions ? <LoadingCard/> : null;

    const errorContent = isErrorExhibitions ? <ErrorCard/> : null;

    const content = !isLoadingExhibitions && !isErrorExhibitions ? exhibitionsCards : null;

    return (
        <div className="exhibitions">
            <Container>
                <div className="exhibitions__grid">
                    {loadingContent}
                    {content}
                    {errorContent}
                </div>    
            </Container>
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
        exhibitions: state.exhibitions,
        isLoadingExhibitions: state.isLoadingExhibitions,
        isErrorExhibitions: state.isErrorExhibitions
    }
};

export default connect(mapStateToProps, actions)(ExhibitionsList);