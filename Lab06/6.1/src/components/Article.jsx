import React from 'react';

import articles from '../articles.json';

import './Article.less';

const article = React.createClass({
    getInitialState() {
        const { articleId } = this.props.params;

        return {
            article: articles.find(article => article.id === articleId)
        };
    },

    componentWillReceiveProps(nextProps) {
        const { articleId: prevId } = this.props.params;
        const { articleId: nextId } = nextProps.params;

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
                <p><b>{article.subject}</b></p>
                <p>Author: {article.author}</p>
                <hr />
                <p>{article.body}</p>
            </div>
        );
    }
});

export default article;
