import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Product from "./Product";
import {requestProduct} from "../../redux/reducers/ProductReducer";
import {getProduct} from "../../redux/selectors/productSelectors";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {getErrorMsg, getIsLoading} from "../../redux/selectors/appSelectors";
import {addToCart} from "../../redux/reducers/AuthReducer";

const ProductContainer = React.memo((props) => {

    useEffect(() => {
        let productId = props.match.params.productId;
        if (productId) {
            props.requestProduct(productId);
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
    addToCart
};

export default connect(mapStateToProps, actionCreators)(ProductContainer);