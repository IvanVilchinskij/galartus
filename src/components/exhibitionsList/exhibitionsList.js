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
import WithMuseamService from '../hoc/withMuseamService';

const ExhibitionsList = ({MuseamService, exhibitionsLoaded, exhibitions}) => {

    useEffect(() => {
        MuseamService.getList('/exhibitions')
            .then(res => {
                exhibitionsLoaded(res);
            })
            .catch((err) => {
                throw new Error(err);
            })
    }, []);

    const exhibitionsCards = exhibitions.map((item) => {
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
    });

    return (
        <div className="exhibitions">
            <Container>
                <div className="exhibitions__grid">
                    {exhibitionsCards}
                </div>    
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        exhibitions: state.exhibitions
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(ExhibitionsList));