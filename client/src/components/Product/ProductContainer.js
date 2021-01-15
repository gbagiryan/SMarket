import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Product from "./Product";
import {requestProduct} from "../../redux/reducers/ProductReducer";
import {getProduct} from "../../redux/selectors/productSelectors";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {getErrorMsg, getIsLoading} from "../../redux/selectors/appSelectors";
import {addToCart} from "../../redux/reducers/AuthReducer";
import {clearMessages} from "../../redux/reducers/AppReducer";

const ProductContainer = React.memo((props) => {

    useEffect(() => {
        let productId = props.match.params.productId;
        if (productId) {
            props.requestProduct(productId);
        }
        return () => {
            props.clearMessages()
        }
    }, [props.match.params]);

    const handleAddToCart = (productId) => {
        props.addToCart(productId);
    }

    return (
        <div>
            <Product product={props.product} errorMsg={props.errorMsg} isLoading={props.isLoading}
                     handleAddToCart={handleAddToCart} isAuthed={props.isAuthed}/>
        </div>
    );
});

const mapStateToProps = (state) => ({
    product: getProduct(state),
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    requestProduct,
    addToCart,
    clearMessages
};

export default connect(mapStateToProps, actionCreators)(ProductContainer);