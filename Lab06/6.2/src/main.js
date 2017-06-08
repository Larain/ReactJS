import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from './App.jsx';
import AboutPage from './components/AboutPage.jsx';
import ProductList from './components/ProductList.jsx';
import Product from './components/Product.jsx';
import Cart from './components/Cart.jsx';
import Main from './components/MainPage.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <Route path='/main/' component={Main} />
            <Route path='/products/' component={ProductList} />
            <Route path='/products/:id' component={Product} />
            <Route path='/cart/' component={Cart} />
        </Route>
    </Router>,
    document.getElementById('mount-point')
);