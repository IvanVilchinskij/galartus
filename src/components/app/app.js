import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../actions/actions';
import Footer from '../footer/footer';
import MainPage from '../../pages/mainPage';
import ExhibitionsPage from '../../pages/exhibitionsPage';
import AboutPage from '../../pages/aboutPage';
import AllCollectionsPage from '../../pages/allCollectionsPage';
import UserPage from '../../pages/userPage';
import CollectionPage from '../../pages/collectonPage';
import ItemPage from '../../pages/itemPage';
import AdminPage from '../../pages/adminPage';
import Header from '../header/header';
import NotFoundPage from '../../pages/notFoundPage';
import ExhibitionInfo from '../exhibitionInfo/exhibitionInfo';

const App = ({currentCollection, defCurrentCollection, isAutorization, setAutorization}) => {
    useEffect(() => {
        if (!currentCollection) {
            const num = localStorage.getItem('collectionId');

            defCurrentCollection(num);
        }

        if (localStorage.getItem('access_token')) {
            setAutorization(true);
        } else {
            setAutorization(false);
        }
    }, [isAutorization]);
    
    return (
        <Router>
            <Header/>
            <div className="content">
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/exhibitions' component={ExhibitionsPage}/>
                    <Route path='/collections' exact component={AllCollectionsPage}/>
                    <Route path='/about' component={AboutPage}/>
                    <Route path='/user' component={UserPage} />
                    <Route exact path='/collections/:id' component={CollectionPage}/>
                    <Route exact path={`/collections/${currentCollection}/pictures/:id`} component={ItemPage} />
                    <Route exact path='/exhibitions/:id' component={ExhibitionInfo}/>
                    <Route path='/admin' component={AdminPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>  
            <Footer/>
        </Router>
    
  );
};

const mapStateToProps = (state) => {
    return {
        currentCollection: state.currentCollection,
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(App);
