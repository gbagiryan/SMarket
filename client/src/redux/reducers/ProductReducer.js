import {productApi} from "../../api/api";

const PRODUCT_SET_PRODUCT = 'PRODUCT_SET_PRODUCT';

export const ProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_SET_PRODUCT:
            return {
                ...state,
                product: {...action.product}
            }

        default:
            return state;
    }
};

const setProduct = (product) => ({type: PRODUCT_SET_PRODUCT, product});

export const addNewListing = (product) => async (dispatch) => {
    await productApi.addNewListing(product);
};
export const requestProduct = (productId) => async (dispatch) => {
    const res = await productApi.requestProduct(productId);
    if (res && res.data) {
        dispatch(setProduct(res.data));
    }
};

