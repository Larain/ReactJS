import React from 'react';

import products from '../products.json';

import './Product.less';

const Product = React.createClass({
    getInitialState() {
        const { id } = this.props.params;

        return {
            product: products.find(product => product.id === id)
        };
    },

    handleAddClick(){
        var localProducts = JSON.parse(localStorage.getItem('products'));
        if (localProducts) {
            var newProducts = localProducts.slice();
            newProducts.push(this.state.product.id);
            localProducts = newProducts;
            console.log(localProducts);}
        else localProducts = [this.state.product.id];
        var products = JSON.stringify(localProducts);
        localStorage.setItem('products', products);
    },

    componentWillReceiveProps(nextProps) {
        console.log(id);
        console.log(nextProps);
        const { id: prevId } = this.props.params;
        const { id: nextId } = nextProps.params;

        if (prevId !== nextId) {
            this.setState({
                product: products.find(product => product.id === nextId)
            });
        }
    },

    render() {
        const { product } = this.state;

        return (
            <div className='product'>
                <p><b>{product.title}</b></p>
                <p>Author: {product.author}</p>
                <p>Price: {product.price}</p>
                <hr />
                <p>{product.body}</p>
                <button onClick={this.handleAddClick}>Add to Cart</button>
            </div>
        );
    }
});

export default Product;