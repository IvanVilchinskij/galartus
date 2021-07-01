import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as actions from '../actions/actions';
import CollectionsPictures from '../components/collectionsPictures/collectionsPictures';

import '../styles/pages/collectionPage.scss';

const CollectionPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {id} = useParams();
    
    return (
        <div className="collection-page">
            <Container>
                <h2 className="pictures__title title"></h2>
                <CollectionsPictures collectionId={+id}/>            
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