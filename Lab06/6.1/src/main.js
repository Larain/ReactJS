import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from './App.jsx';
import AboutPage from './components/AboutPage.jsx';
import InboxPage from './components/InboxPage.jsx';
import Article from './components/Article.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='/articles/' component={InboxPage} />
            <Route path='/article/:articleId' component={Article} />
        </Route>
    </Router>,
    document.getElementById('mount-point')
);