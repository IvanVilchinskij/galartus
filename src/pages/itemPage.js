import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/pages/itemPage.scss';

import * as actions from '../actions/actions';
import axiosInstance from '../axios';
import PictureInfo from '../components/pictureInfo/pictureInfo';

const ItemPage = ({toggleHeaderColor, setCurrentPicture, currentPicture}) => {
    const {id} = useParams();

    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);

        /* axiosInstance.get(`pictures?id=${id}`)
            .then(res => {
                setCurrentPicture(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        
        return function cleanup() {
            setCurrentPicture([]);
        }    */ 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (   
        <div className="item-page">
            <PictureInfo pictureId={id}/>
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