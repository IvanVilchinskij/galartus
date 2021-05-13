import React, {useEffect} from 'react';
import {
        Container, 
        Card, 
        CardImg, 
        CardTitle, 
        CardText, 
        CardBody,
        Button
    } from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/pages/itemPage.scss';

import * as actions from '../actions/actions';
import axiosInstance from '../axios';

const ItemPage = ({toggleHeaderColor, currentCollection, itemId, setCurrentPicture, currentPicture}) => {

    useEffect(() => {
        toggleHeaderColor(true);

        axiosInstance.get(`pictures?id=${itemId}`)
            .then(res => {
                setCurrentPicture(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const currentItem = currentPicture.map(item => {
        return (
            <Card className='item-info'>
                <div className="item-info__img">
                    <CardImg top width="100%" src={item.image} alt={item.name} />
                </div>               
                <CardBody>
                    <CardTitle tag="h5">{item.name}</CardTitle>
                    <CardText>{item.autor}</CardText>
                    <CardText>{item.description}</CardText>
                    <CardText>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </CardText>
                </CardBody>
            </Card>
        );
    });

    return (   
        <div className="item-page">
            <Container>
                {currentItem}
                <Button ><Link onClick={() => setCurrentPicture([])} to={`/collections/${currentCollection}`}>Назад к коллекциям</Link></Button>
            </Container>
        </div>          
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
        currentCollection: state.currentCollection,
        currentPicture: state.currentPicture
    }
};

export default connect(mapStateToProps, actions)(ItemPage);