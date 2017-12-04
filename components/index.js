import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {App} from './App';
import LoginContainer from './containers/LoginContainer';
import Waiting from './containers/Waiting';
import {Provider} from 'react-redux';
import store from '../store';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={LoginContainer}/>
                <Route path='/login' component={LoginContainer}/>
                <Route path='/waiting' component={Waiting}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

