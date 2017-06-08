import React from 'react';
import classNames from 'classnames';

import './MessagePreview.less';

const MessagePreview = React.createClass({
    render() {
        const { title, author, selected, price, onClick } = this.props;

        const classes = classNames('MessagePreview', { selected });

        return (
            <div className={classes} onClick={onClick}>
                <div className='title'>
                    {title}
                </div>

                <div className='from'>
                    {`by ${author}`}
                </div>
                <div className='title'>
                    {price}
                </div>
            </div>
        );
    }
});

export default MessagePreview;