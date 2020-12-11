import React from 'react';
import Loading from "../Common/Loading/Loading";
import {NavLink} from "react-router-dom";

const Product = (props) => {
    if (!props.product) {
        return <Loading/>
    }
    return (
        <div>
            <div>{props.product.productName}</div>
            <div>{props.product.description}</div>
            <div>{props.product.price}</div>
            <div>{props.product.category}</div>
            <NavLink to={`/user/${props.product.user.profileId}`}>{props.product.user.username}</NavLink>
        </div>
    )
};

export default Product;