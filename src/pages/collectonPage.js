import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as actions from '../actions/actions';
import CollectionsPictures from '../components/collectionsPictures/collectionsPictures';
import axiosInstance from '../axios';

import db from '../db';

import '../styles/pages/collectionPage.scss';

const CollectionPage = ({toggleHeaderColor}) => {
    const {id} = useParams();

    const [collectionName, setCollectionName] = useState(null);

    useEffect(() => {
        toggleHeaderColor(true);

        window.scroll(0, 0);

        /* axiosInstance.get(`categories?id=${id}`)
            .then(res => {
                if (res.data[0]) {
                    setCollectionName(res.data[0].name);
                } else {
                    setCollectionName(null);
                }
            })
            .catch(err => {
                setCollectionName(null);
                console.log(err);
            }); */

        /* if (collections.length === 0) {
            collectionsLoaded(db.collections);
        }   */

        db.collections.forEach(item => {
            if (item.id === +id) {
                setCollectionName(item.name);
            }
        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="collection-page">
            <div className='container'>
                <h2 className="pictures__title title page-title">{collectionName}</h2>
                <CollectionsPictures collectionId={+id}/>            
            </div>        
        </div>      
    );
};

const mapStateToProps = (state) => {
    return {
        darkHeader: state.darkHeader,
    }
};

export default connect(mapStateToProps, actions)(CollectionPage);