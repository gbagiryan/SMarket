import React from 'react';
import {connect} from "react-redux";
import {getAuthedUserCart, getAuthedUserData, getAuthedUserProducts} from "../../redux/selectors/authSelectors";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {AuthedUserProfile} from "./AuthedUserProfile";
import {deleteFromCart, deleteProduct} from "../../redux/reducers/AuthReducer";

const AuthedUserProfileContainer = (props) => {

    const handleDeleteProduct = (productId) => {
        props.deleteProduct(productId);
    }
    const handleDeleteFromCart = (productId) => {
        props.deleteFromCart(productId);
    }

    return (
        <div>
            <AuthedUserProfile profile={props.profile}
                               authedUserProducts={props.authedUserProducts}
                               authedUserCart={props.authedUserCart}
                               handleDeleteProduct={handleDeleteProduct}
                               handleDeleteFromCart={handleDeleteFromCart}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: getAuthedUserData(state),
    authedUserProducts: getAuthedUserProducts(state),
    authedUserCart: getAuthedUserCart(state)
});

const actionCreators = {
    deleteProduct,
    deleteFromCart
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(AuthedUserProfileContainer);