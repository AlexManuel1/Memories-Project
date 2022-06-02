import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

const store = configureStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <App />, 
    document.getElementById('root'));
