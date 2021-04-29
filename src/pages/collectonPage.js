import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import ItemCards from '../components/itemCards/itemCards';

import '../styles/pages/collectionPage.scss';

const CollectionPage = ({collcetionId, toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    return (
        <div className="collection-page">
            <Container>
                <div className="collection-page__wrapper">
                    <ItemCards collectionId={+collcetionId}/>
                </div>    
            </Container>        
        </div>      
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(CollectionPage);