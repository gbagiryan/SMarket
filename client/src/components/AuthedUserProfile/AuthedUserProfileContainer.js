import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getAuthedUserCart, getAuthedUserData, getAuthedUserProducts} from "../../redux/selectors/authSelectors";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {AuthedUserProfile} from "./AuthedUserProfile";
import {deleteFromCart, deleteProduct} from "../../redux/reducers/AuthReducer";
import {clearMessages} from "../../redux/reducers/AppReducer";
import {getErrorMsg} from "../../redux/selectors/appSelectors";

const AuthedUserProfileContainer = (props) => {
    useEffect(() => {
        return () => {
            props.clearMessages()
        }
    }, []);

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
                               errorMsg={props.errorMsg}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    profile: getAuthedUserData(state),
    authedUserProducts: getAuthedUserProducts(state),
    errorMsg: getErrorMsg(state),
    authedUserCart: getAuthedUserCart(state)
});

const actionCreators = {
    deleteProduct,
    deleteFromCart,
    clearMessages
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(AuthedUserProfileContainer);