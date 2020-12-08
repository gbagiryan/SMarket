import React from 'react';
import Loading from "../Common/Loading/Loading";

const Product = (props) => {
    if (!props.product) {
        return <Loading/>
    }
    return (
        <div>
            {props.product.productName}
            {props.product.description}
            {props.product.price}
            {props.product.category}
        </div>
    )
};

export default Product;