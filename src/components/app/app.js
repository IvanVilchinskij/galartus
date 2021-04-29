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

const App = ({currentCollection, defCurrentCollection}) => {
    useEffect(() => {
        if (!currentCollection) {
            const num =localStorage.getItem('collectionId');

            defCurrentCollection(num);
        }
    });
    
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
                    <Route path={`/collections/:id`} exact render={
                        ({match}) => {
                            const {id} = match.params;

                            return <CollectionPage collcetionId={id}/>
                        }
                    }/>
                    <Route path={`/collections/${currentCollection}/pictures/:id`} exact render={
                        ({match}) => {
                            const {id} = match.params;

                            return <ItemPage itemId={id} />
                        }
                    } />
                    <Route path='/admin' component={AdminPage}/>
                </Switch>
            </div>  
            <Footer/>
        </Router>
    
  );
};

const mapStateToProps = (state) => {
    return {
        currentCollection: state.currentCollection
    }
};

export default connect(mapStateToProps, actions)(App);
