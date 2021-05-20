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
import ExhibitionInfoPage from '../../pages/exhibitionInfoPage';
import CartPage from '../../pages/cartPage';

const App = ({isAutorization, setAutorization}) => {
    useEffect(() => {
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
                    <Route exact path='/' component={MainPage}/>
                    <Route exact path='/exhibitions' component={ExhibitionsPage}/>
                    <Route exact path='/collections' component={AllCollectionsPage}/>
                    <Route exact path='/about' component={AboutPage}/>
                    <Route exact path='/user' component={UserPage} />
                    <Route exact path='/collections/:id' component={CollectionPage}/>
                    <Route exact path={`/pictures/:id`} component={ItemPage} />
                    <Route exact path='/exhibitions/:id' component={ExhibitionInfoPage}/>
                    <Route exact path='/admin' component={AdminPage}/>
                    <Route exact path='/cart' component={CartPage} />
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>  
            <Footer/>
        </Router>
    
  );
};

const mapStateToProps = (state) => {
    return {
        isAutorization: state.isAutorization
    }
};

export default connect(mapStateToProps, actions)(App);
