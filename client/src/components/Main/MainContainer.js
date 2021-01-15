import React, {useEffect, useState} from 'react';
import {Main} from "./Main";
import {connect} from "react-redux";
import {productClearData, requestProductList} from "../../redux/reducers/ProductReducer";
import {getProductList, getProductsCount} from "../../redux/selectors/productSelectors";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {getErrorMsg, getIsLoading} from "../../redux/selectors/appSelectors";
import {addToCart} from "../../redux/reducers/AuthReducer";
import {clearMessages} from "../../redux/reducers/AppReducer";

const MainContainer = (props) => {

    const [Skip, setSkip] = useState(0);
    const [IsLoadMore, setIsLoadMore] = useState(false);
    const [Limit] = useState(5);

    useEffect(() => {
        props.requestProductList(Skip, Limit);

        return () => {
            props.productClearData()
            props.clearMessages()
        }
    }, []);

    const loadMore = () => {
        let newSkip = Skip + Limit;
        setSkip(newSkip);
        setIsLoadMore(true);
        props.requestProductList(newSkip, Limit, true);
    };

    const handleAddToCart = (productId) => {
        props.addToCart(productId);
    }
    return (
        <div>
            <Main productList={props.productList}
                  productsCount={props.productsCount}
                  isLoadMore={IsLoadMore}
                  loadMore={loadMore}
                  isLoading={props.isLoading}
                  errorMsg={props.errorMsg}
                  handleAddToCart={handleAddToCart}
                  isAuthed={props.isAuthed}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    productList: getProductList(state),
    productsCount: getProductsCount(state),
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    requestProductList,
    addToCart,
    productClearData,
    clearMessages
};

export default connect(mapStateToProps, actionCreators)(MainContainer);