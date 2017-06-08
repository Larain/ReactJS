import React from 'react';

//noinspection JSUnresolvedVariable
import articles from '../articles.json';

import './message.less';

const article = React.createClass({
    getInitialState() {
        const { id } = this.props.params;

        return {
            article: articles.find(article => article.id === id)
        };
    },

    handleAddClick(){
        var localProducts = JSON.parse(localStorage.getItem('products'));
        if (localProducts) {
            var newProducts = localProducts.slice();
            newProducts.push(this.state.article.id);
            localProducts = newProducts;
            console.log(localProducts);}
        else localProducts = [this.state.article.id];
        var products = JSON.stringify(localProducts);
        localStorage.setItem('products', products);
    },

    componentWillReceiveProps(nextProps) {
        const { id: prevId } = this.props.params;
        const { id: nextId } = nextProps.params;

        if (prevId !== nextId) {
            this.setState({
                article: articles.find(article => article.id === nextId)
            });
        }
    },

    render() {
        const { article } = this.state;

        return (
            <div className='article'>
                <p><b>{article.title}</b></p>
                <p>Author: {article.author}</p>
                <p>Price: {article.price}</p>
                <hr />
                <p>{article.body}</p>
                <button onClick={this.handleAddClick}>Add to Cart</button>
            </div>
        );
    }
});

export default article;