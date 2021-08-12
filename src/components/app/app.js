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
import CartBtn from '../cart/cartBtn/cartBtn';
import axiosInstance from '../../axios';
import PaymentListPage from '../../pages/paymentListPage';

const App = ({isAutorization, setAutorization, setCartCount, cartCount}) => {
    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setAutorization(true);

            /* axiosInstance.get('cart/details?is_ordered=0')
                .then(res => {
                    if (res.data[0] && res.data[0].items.length > 0) {
                        setCartCount(cartCount, res.data[0].items.length);
                    } else {
                        setCartCount(0, 0);
                    }
                }) */
        } else {
            setAutorization(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAutorization]);

    return (
        <Router>
            <Header/>
            <CartBtn cartCount={cartCount}/>
            <div className="content">
                <Switch>
                    <Route exact path='/galartus_front/' component={MainPage}/>
                    <Route exact path='/galartus_front/exhibitions' component={ExhibitionsPage}/>
                    <Route exact path='/galartus_front/collections' component={AllCollectionsPage}/>
                    <Route exact path='/galartus_front/about' component={AboutPage}/>
                    <Route exact path='/galartus_front/user' component={UserPage} />
                    <Route exact path='/galartus_front/collections/:id' component={CollectionPage}/>
                    <Route exact path={`/galartus_front/pictures/:id`} component={ItemPage} />
                    <Route exact path='/galartus_front/exhibitions/:id' component={ExhibitionInfoPage}/>
                    <Route exact path='/galartus_front/admin' component={AdminPage}/>
                    <Route exact path='/galartus_front/cart' component={CartPage} />
                    <Route exact path='/galartus_front/payment-list/:id' component={PaymentListPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>  
            <Footer/>
        </Router>
    
  );
};

const mapStateToProps = (state) => {
    return {
        isAutorization: state.isAutorization,
        cartCount: state.cartCount,
    }
};

export default connect(mapStateToProps, actions)(App);
