import React from 'react';
import Loading from "../Common/Loading/Loading";
import {NavLink} from "react-router-dom";
import {Error} from "../Common/Messages/Messages";

const Product = (props) => {
    if (props.errorMsg) {
        return <Error errorMsg={props.errorMsg}/>
    }
    if (props.isLoading || !props.product) {
        return <Loading/>
    }

    return (
        <div>
            <div>{props.product.productName}</div>
            <div>{props.product.description}</div>
            <div>{props.product.price}</div>
            <div>{props.product.category}</div>
            <NavLink to={`/user/${props.product.user._id}`}>{props.product.user.username}</NavLink>
            {props.isAuthed
                ? <button onClick={() => props.handleAddToCart(props.product._id)}>Add to cart</button>
                : null
            }
        </div>
    )
};

export default Product;