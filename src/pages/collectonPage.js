import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as actions from '../actions/actions';
import ItemCards from '../components/itemCards/itemCards';

import '../styles/pages/collectionPage.scss';

const CollectionPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    const {id} = useParams();
    
    return (
        <div className="collection-page">
            <Container>
                <ItemCards collectionId={+id}/>            
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