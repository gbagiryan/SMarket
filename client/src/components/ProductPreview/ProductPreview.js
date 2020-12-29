import React from 'react';
import {NavLink} from "react-router-dom";

const ProductPreview = (props) => {

    return (
        <div>
            <NavLink to={`/product/${props.product._id}`}>{props.product.productName}</NavLink>
            <div>{props.product.description}</div>
            <div>{props.product.price}</div>
            <div>{props.product.category}</div>
            <NavLink to={`/user/${props.product.user.profileId}`}>{props.product.user.username}</NavLink>
        </div>
    )
};

export default ProductPreview;