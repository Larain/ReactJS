import React from 'react';

import ProductPreview from './ProductPreview.jsx';

import products1 from '../products.json';

import './ProductList.less';

const ProductList = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            products: products1,
            filteredProducts: products1
        };
    },

    handlePreviewClick(id) {
        this.context.router.push(`/products/${id}`);
    },

    handleSearchChange(evt) {
        var products = this.state.products;
        products = products.filter(function(product) {
                return product.title.indexOf(evt.target.value) != -1;
                });
        this.setState({filteredProducts: products});
    },

    render() {

        const { productId: selectedProductId } = this.props.params;

        return (
            <div>
                <p  className="search">Search: <input type="text" onChange={this.handleSearchChange}></input></p>
                    <div className='ProductList'>
                        <div className='products'>
                            {
                                this.state.filteredProducts.map(product =>
                                    <ProductPreview
                                        key={product.id}
                                        selected={product.id === selectedProductId}
                                        price={product.price}
                                        onClick={this.handlePreviewClick.bind(null, product.id)}
                                        title={product.title}
                                        author={product.author}
                                    />
                                )
                            }
                        </div>
                    </div>
            </div>
        );
    }
});

export default ProductList;