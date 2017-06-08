import React from 'react';

import MessagePreview from './MessagePreview.jsx';

import articles from '../articles.json';

import './InboxPage.less';

const InboxPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            articles
        };
    },

    handlePreviewClick(articleId) {
        this.context.router.push(`/article/${articleId}`);
    },

    render() {
        const { articles } = this.state;

        const { articleId: selectedArticleId } = this.props.params;

        return (
            <div className='InboxPage'>
                <div className='messages'>
                    {
                        articles.map(article =>
                            <MessagePreview
                                key={article.id}
                                selected={article.id === selectedArticleId}
                                onClick={this.handlePreviewClick.bind(null, article.id)}
                                title={article.subject}
                                author={article.author}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
});

export default InboxPage;