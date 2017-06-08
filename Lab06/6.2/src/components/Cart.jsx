import React from 'react';
import { Link } from 'react-router';

import MessagePreview from './MessagePreview.jsx';

import articles1 from '../articles.json';

import './InboxPage.less';

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
                fullProducts.push(articles1.find(article => article.id === localProducts[i]));
            localProducts = fullProducts;
        }
        return {
            articles: articles1,
            products: localProducts
        };
    },

    handlePreviewClick(id) {
        this.context.router.push(`/goods/${id}`);
    },

    render() {
        return (
            <div >
                <div className='InboxPage'>
                    <div className='messages'>
                        {
                            this.state.products.map(article =>
                                <MessagePreview
                                    selected={false}
                                    title={article.title}
                                    author={article.author}
                                    price={article.price}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
});

export default Cart;
