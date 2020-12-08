import React from 'react';
import Loading from "../Common/Loading/Loading";
import ProductPreview from "../ProductPreview/ProductPreview";

export const AuthedUserProfile = (props) => {
    if (!props.profile) {
        return <Loading/>
    }
    return (
        <div>
            <h1>{props.profile.username}'s Profile</h1>
            <p>{props.profile.username}</p>
            <p>{props.profile.firstName} {props.profile.lastName}</p>
            <div>
                <h1>My products</h1>
                {props.profile.products.map(product =>
                    <ProductPreview product={product} key={product._id}/>
                )}
            </div>
        </div>
    )
};