import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

import App from './components/app/app';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
        <div className="content-wrapper">
            <App/>
        </div>
  </Provider>,
  document.getElementById('root')
);

