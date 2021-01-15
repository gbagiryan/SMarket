import {verifyAuth} from "./AuthReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const initialState = {
    isLoading: false,
    successMsg: '',
    errorMsg: '',
    initialized: false
}

export const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg: action.errorMsg
            }
        case SET_SUCCESS_MESSAGE:
            return {
                ...state,
                successMsg: action.successMsg
            }
        case CLEAR_MESSAGES:
            return {
                ...state,
                successMsg: '',
                errorMsg: '',
            };
        default:
            return state;
    }
};

const setInitialized = () => ({type: SET_INITIALIZED});
export const setLoading = (isLoading) => ({type: SET_LOADING, isLoading});
export const setErrorMsg = (errorMsg) => ({type: SET_ERROR_MESSAGE, errorMsg});
export const setSuccessMsg = (successMsg) => ({type: SET_SUCCESS_MESSAGE, successMsg});
export const clearMessages = () => ({type: CLEAR_MESSAGES});

export const initializeApp = () => async (dispatch) => {
    await dispatch(verifyAuth());
    dispatch(setInitialized());
};