import {productApi} from "../../api/api";

const PRODUCT_SET_PRODUCT = 'PRODUCT_SET_PRODUCT';
const PRODUCT_SET_PRODUCT_LIST = 'PRODUCT_SET_PRODUCT_LIST';

const initialState = {
    productList: []
};

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
                productList: [...state.productList, ...action.productList]
            }
        default:
            return state;
    }
};

export const setProduct = (product) => ({type: PRODUCT_SET_PRODUCT, product});
export const setProductList = (productList) => ({type: PRODUCT_SET_PRODUCT_LIST, productList});

export const addNewListing = (product) => async (dispatch) => {
    await productApi.addNewListing(product);
};
export const requestProduct = (productId) => async (dispatch) => {
    const res = await productApi.requestProduct(productId);
    if (res && res.data) {
        dispatch(setProduct(res.data));
    }
};
export const requestProductList = (skip, limit) => async (dispatch) => {
    const res = await productApi.requestProductList(skip, limit);
    if (res && res.data) {
        dispatch(setProductList(res.data));
    }
};

