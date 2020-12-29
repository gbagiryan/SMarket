import {authApi} from "../../api/api";
import {setErrorMsg, setLoading, setSuccessMsg} from "./AppReducer";

const AUTH_SET_IS_AUTHED = 'AUTH_SET_IS_AUTHED';
const AUTH_SET_USER_DATA = 'AUTH_SET_USER_DATA';
const AUTH_SET_USER_PRODUCTS = 'AUTH_SET_USER_PRODUCTS';
const AUTH_SET_USER_CART = 'AUTH_SET_USER_CART';
const AUTH_UPDATE_USER_DATA = 'AUTH_UPDATE_USER_DATA';
const AUTH_ADD_PRODUCT = 'AUTH_ADD_PRODUCT';
const AUTH_ADD_TO_CART = 'AUTH_ADD_TO_CART';

const initialState = {
    isAuthed: false,
    authedUserData: null,
    authedUserProducts: null,
    authedUserCart: false
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_IS_AUTHED:
            return {
                ...state,
                isAuthed: action.isAuthed
            }
        case AUTH_SET_USER_DATA:
            return {
                ...state,
                authedUserData: action.authedUserData
            }
        case AUTH_SET_USER_PRODUCTS:
            return {
                ...state,
                authedUserProducts: action.authedUserProducts
            }
        case AUTH_SET_USER_CART:
            return {
                ...state,
                authedUserCart: action.authedUserCart
            }
        case AUTH_UPDATE_USER_DATA:
            return {
                ...state,
                authedUserData: {...state.authedUserData, ...action.authedUserData}
            }
        case AUTH_ADD_PRODUCT:
            return {
                ...state,
                authedUserProducts: [...state.authedUserProducts, action.addedProduct]
            }
        case AUTH_ADD_TO_CART:
            return {
                ...state,
                authedUserCart: [...state.authedUserCart, action.addedProduct]
            }
        default:
            return state;
    }
};

const setIsAuthed = (isAuthed) => ({type: AUTH_SET_IS_AUTHED, isAuthed});
const setAuthedUserData = (authedUserData) => ({type: AUTH_SET_USER_DATA, authedUserData});
const setAuthedUserProducts = (authedUserProducts) => ({type: AUTH_SET_USER_PRODUCTS, authedUserProducts});
const setAuthedUserCart = (authedUserCart) => ({type: AUTH_SET_USER_CART, authedUserCart});
const updateAuthedUserData = (authedUserData) => ({type: AUTH_UPDATE_USER_DATA, authedUserData});
const addToAuthedUserProducts = (addedProduct) => ({type: AUTH_ADD_PRODUCT, addedProduct});
const addToAuthedUserCart = (addedProduct) => ({type: AUTH_ADD_TO_CART, addedProduct});

export const login = (email, password) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.login(email, password);
        dispatch(setAuthedUserData(res.data.user));
        dispatch(setAuthedUserProducts(res.data.products));
        dispatch(setAuthedUserCart(res.data.cart));
        dispatch(setIsAuthed(true));
        dispatch(setLoading(false));
    } catch (e) {
        dispatch(setAuthedUserData(null));
        dispatch(setIsAuthed(false));
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const logout = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await authApi.logout();
        dispatch(setAuthedUserData(null));
        dispatch(setAuthedUserProducts(null));
        dispatch(setAuthedUserCart(null));
        dispatch(setIsAuthed(false));
        dispatch(setLoading(false));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const register = (email, username, password, firstName, lastName) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.register(email, username, password, firstName, lastName);
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const verifyAuth = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.verifyAuth();
        if (res.data) {
            dispatch(setAuthedUserData(res.data.user));
            dispatch(setAuthedUserProducts(res.data.products));
            dispatch(setAuthedUserCart(res.data.cart));
            dispatch(setIsAuthed(true));
        } else {
            dispatch(setAuthedUserData(null));
            dispatch(setIsAuthed(false));
        }
        dispatch(setLoading(false));
    } catch (e) {
        dispatch(setAuthedUserData(null));
        dispatch(setIsAuthed(false));
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

//**********************************************************************************************************************

export const editProfile = (formData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.editProfile(formData);
        dispatch(updateAuthedUserData(res.data.user));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.deleteProduct(productId);
        dispatch(setAuthedUserProducts(res.data.products));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const addToCart = (productId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.addToCart(productId);
        dispatch(addToAuthedUserCart(res.data.addedProduct));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const deleteFromCart = (productId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.deleteFromCart(productId);
        dispatch(setAuthedUserCart(res.data.cart));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const editProduct = (formData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.editProduct(formData);
        dispatch(setAuthedUserProducts(res.data.products));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};

export const postProduct = (product) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await authApi.addNewListing(product);
        dispatch(addToAuthedUserProducts(res.data.addedProduct));
        dispatch(setLoading(false));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};