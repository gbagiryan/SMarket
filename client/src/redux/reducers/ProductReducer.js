import {productApi} from "../../api/api";
import {setErrorMsg, setLoading} from "./AppReducer";

const PRODUCT_SET_PRODUCT = 'PRODUCT_SET_PRODUCT';
const PRODUCT_SET_PRODUCT_LIST = 'PRODUCT_SET_PRODUCT_LIST';
const PRODUCT_LOAD_MORE_PRODUCTS_TO_LIST = 'PRODUCT_LOAD_MORE_PRODUCTS_TO_LIST';

const initialState = {
    product: null,
    productList: [],
    productsCount: 0,
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_SET_PRODUCT:
            return {
                ...state,
                product: {...action.product}
            }
        case PRODUCT_SET_PRODUCT_LIST:
            return {
                ...state,
                productList: [...action.productList],
                productsCount: action.productsCount
            }
        case PRODUCT_LOAD_MORE_PRODUCTS_TO_LIST:
            return {
                ...state,
                productList: [...state.productList, ...action.productList],
                productsCount: action.productsCount
            }
        default:
            return state;
    }
};

const setProduct = (product) => ({type: PRODUCT_SET_PRODUCT, product});
const setProductList = (productList, productsCount) => ({type: PRODUCT_SET_PRODUCT_LIST, productList, productsCount});
const loadMoreProductsToList = (productList, productsCount) => ({
    type: PRODUCT_LOAD_MORE_PRODUCTS_TO_LIST,
    productList,
    productsCount
});

export const requestProduct = (productId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await productApi.requestProduct(productId);
        dispatch(setProduct(res.data.product));
        dispatch(setLoading(false));
    } catch (e) {
        console.log(e.response.data.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.response.data.errorMessage));
    }
};

export const requestProductList = (skip, limit, loadMore) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await productApi.requestProductList(skip, limit);
        if (loadMore) {
            dispatch(loadMoreProductsToList(res.data.products, res.data.productsCount));
        } else {
            dispatch(setProductList(res.data.products, res.data.productsCount));
        }
        dispatch(setLoading(false));
    } catch (e) {
        console.log(e.response.data.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.response.data.errorMessage));
    }
};

