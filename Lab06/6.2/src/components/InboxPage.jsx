import React from 'react';

import MessagePreview from './MessagePreview.jsx';

import articles1 from '../articles.json';

import './InboxPage.less';

const InboxPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            articles: articles1,
            filteredArticles: articles1
        };
    },

    handlePreviewClick(id) {
        this.context.router.push(`/goods/${id}`);
    },

    handleSearchChange(evt) {
        var goods = this.state.articles;
        goods = goods.filter(function(product) {
                return product.title.indexOf(evt.target.value) != -1;
                });
        this.setState({filteredArticles: goods});
    },

    render() {

        const { articleId: selectedArticleId } = this.props.params;

        return (
            <div>
                <p  className="search">Search: <input type="text" onChange={this.handleSearchChange}></input></p>
            <div className='InboxPage'>
                <div className='messages'>
                    {
                        this.state.filteredArticles.map(article =>
                            <MessagePreview
                                key={article.id}
                                selected={article.id === selectedArticleId}
                                price={article.price}
                                onClick={this.handlePreviewClick.bind(null, article.id)}
                                title={article.title}
                                author={article.author}
                            />
                        )
                    }
                </div>
            </div>
            </div>
        );
    }
});

export default InboxPage;