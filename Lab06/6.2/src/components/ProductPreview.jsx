import React from 'react';
import classNames from 'classnames';

import './ProductPreview.less';

const ProductPreview = React.createClass({
    render() {
        const { title, author, selected, price, onClick } = this.props;

        const classes = classNames('product-preview', { selected });

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

export default ProductPreview;