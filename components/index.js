import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import {App} from './App';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';


import {Provider} from 'react-redux';
import store from '../store';

import axios from 'axios';

//import actions that are dispatched to store onEnter
import {receiveUsers} from '../actions/users';


const onAppEnter = function () {
    Promise.all([
        axios.get('/api/users'),

    ])
        .then(responses => responses.map(r => r.data))
        .then(([users]) => {
            store.dispatch(receiveUsers(users));
        })

};



ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} onEnter={onAppEnter}>
                <IndexRoute component={SignupContainer}/>
                <Route path ='/login' component={LoginContainer}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

