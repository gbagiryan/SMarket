import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";
import {NavLink} from "react-router-dom";
import CartPreview from "../CartPreview/CartPreview";

export const AuthedUserProfile = (props) => {
    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <div>
                <h1>{props.profile.username}'s Profile</h1>
                <p>{props.profile.email}</p>
                <p>{props.profile.username}</p>
                <p>{props.profile.firstName} {props.profile.lastName}</p>
                <NavLink to={'/edit_profile'}>Edit</NavLink>
            </div>
            <div>
                <h1>My products</h1>
                {props.authedUserProducts.length
                    ? props.authedUserProducts.map(product =>
                        <div>
                            <ProductPreview product={product} key={product._id}/>
                            <button onClick={() => props.handleDeleteProduct(product._id)}>Delete product</button>
                            <NavLink to={`/edit_product/${product._id}`}>Edit</NavLink>
                        </div>
                    )
                    : <h3>No products to show</h3>
                }
                <h1>My cart</h1>
                {props.authedUserCart.length
                    ? props.authedUserCart.map(product =>
                        <div>
                            <CartPreview product={product} key={product._id}/>
                            <button onClick={() => props.handleDeleteFromCart(product._id)}>Delete product</button>
                        </div>
                    )
                    : <h3>No products in cart</h3>
                }
            </div>
        </div>
    )
};