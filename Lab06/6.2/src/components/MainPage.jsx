import React from 'react';
import { Link } from 'react-router';

import Product from './Product.jsx';

import products from '../products.json';

import './ProductList.less';

const MainPage = React.createClass({
    render() {
        return (
            <div >
                <h2>Welcome to the main page of our online book store. We sell all kind of books so you can definetly find one for yourself!</h2>
            </div>
        );
    }
});

export default MainPage;
