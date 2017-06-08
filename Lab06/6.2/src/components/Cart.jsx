import React from 'react';
import { Link } from 'react-router';

import ProductPreview from './ProductPreview.jsx';

import products1 from '../products.json';

import './ProductList.less';
import './Cart.less';

const Cart = React.createClass({

    getInitialState() {
        var localProducts = JSON.parse(localStorage.getItem('products'));
        console.log(localProducts);
        if (!localProducts) {
            localProducts = [];
        }
        else{
            var fullProducts = [];
            for(var i =0; i <  localProducts.length; i++)
                fullProducts.push(products1.find(product => product.id === localProducts[i]));
            localProducts = fullProducts;
        }
        return {
            allProducts: products1,
            products: localProducts
        };
    },

    handlePreviewClick(id) {
        this.context.router.push(`/product/${id}`);
    },

    handleDeleteClick(id) {
        console.log(this.state.products);
        var newProds = this.state.products.filter(function (product) {
            return product.id !== id;
        });

        this.setState({ products: newProds });

        var newLocalProducts = JSON.stringify(newProds);
        localStorage.setItem('products', newLocalProducts);
    },

    render() {
        const { onClick } = this.props;

        return (
            <div >
                <div className='ProductList'>
                    <div className='products'>
                        {
                            this.state.products.map(product =>
                                <div className="cart-item" key={product.id}>
                                    <ProductPreview
                                        key={product.id}
                                        selected={false}
                                        title={product.title}
                                        author={product.author}
                                        price={product.price}
                                    />
                                    <button className="btn btn-delete" onClick={this.handleDeleteClick.bind(null, product.id)}>Delete</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
});

export default Cart;
