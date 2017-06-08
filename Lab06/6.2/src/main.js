import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from './App.jsx';
import AboutPage from './components/AboutPage.jsx';
import InboxPage from './components/InboxPage.jsx';
import Message from './components/Article.jsx';
import Cart from './components/Cart.jsx';
import Main from './components/MainPage.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='/main/' component={Main} />
            <Route path='/goods/' component={InboxPage} />
            <Route path='/goods/:id' component={Message} />
            <Route path='/cart/' component={Cart} />
        </Route>
    </Router>,
    document.getElementById('mount-point')
);