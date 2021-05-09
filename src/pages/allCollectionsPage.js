import React, {useEffect} from 'react';
import { Container, ButtonGroup, Button } from 'reactstrap';
import {connect} from 'react-redux';

import * as actions from '../actions/actions';
import Collcetions from '../components/collections/collections';

const AllCollectionsPage = ({toggleHeaderColor}) => {
    useEffect(() => {
        toggleHeaderColor(true);
    }, []);

    return (
        <>
            <div className='collection'>
            <Container>
                {/* <div className="collection__filter-btns">
                    <ButtonGroup>
                        <Button>Коллекции музия</Button>
                        <Button>Личные коллекции</Button>
                    </ButtonGroup>
                </div> */}
                <Collcetions/>
            </Container>
        </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader
    }
};

export default connect(mapStateToProps, actions)(AllCollectionsPage);