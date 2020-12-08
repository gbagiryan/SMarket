import React from 'react';

const ProductPreview = (props) => {

    return (
        <div>
            {props.product.productName}
            {props.product.description}
            {props.product.price}
            {props.product.category}
        </div>
    )
};

export default ProductPreview;