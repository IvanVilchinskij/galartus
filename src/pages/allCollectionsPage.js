import React, {useEffect} from 'react';
import { Container, ButtonGroup, Button } from 'reactstrap';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Collcetions from '../components/collections/collections';

const AllCollectionsPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (    
        <div className='collection'>
            <Container>
                <Collcetions/>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AllCollectionsPage);