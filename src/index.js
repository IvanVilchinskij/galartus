import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import App from './components/app/app';
import store from './store';
import MuseamService from './services/museamService';
import MuseamServiceContext from './components/museamServiceContext/museamServiceContext';

const museamService = new MuseamService();

ReactDOM.render(
  <Provider store={store}>
        <MuseamServiceContext.Provider value={museamService}>
            <div className="content-wrapper">
                <App/>
            </div>
        </MuseamServiceContext.Provider> 
  </Provider>,
  document.getElementById('root')
);

