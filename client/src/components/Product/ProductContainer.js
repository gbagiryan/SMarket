import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Product from "./Product";
import {requestProduct} from "../../redux/reducers/ProductReducer";
import {getProduct} from "../../redux/selectors/productSelectors";

const ProductContainer = React.memo((props) => {
    useEffect(() => {
        let productId = props.match.params.productId;
        // if (!productId) {
        //     redirect
        // }
        props.requestProduct(productId);

    }, [props.match.params.productId]);
    return (
        <div>
            <Product product={props.product}/>
        </div>
    );
});

const mapStateToProps = (state) => ({
    product:getProduct(state)
});

const actionCreators = {
    requestProduct
};

export default connect(mapStateToProps, actionCreators)(ProductContainer);