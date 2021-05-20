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
import {Link , useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/pages/itemPage.scss';

import * as actions from '../actions/actions';
import axiosInstance from '../axios';

const ItemPage = ({toggleHeaderColor, setCurrentPicture, currentPicture}) => {
    const {id} = useParams();

    useEffect(() => {
        toggleHeaderColor(true);

        axiosInstance.get(`pictures?id=${id}`)
            .then(res => {
                setCurrentPicture(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const currentItem = currentPicture.map(item => {
        return (
            <Card key={item.id} className='item-info'>
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
            </Container>
        </div>          
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
        currentPicture: state.currentPicture
    }
};

export default connect(mapStateToProps, actions)(ItemPage);