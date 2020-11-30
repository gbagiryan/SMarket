import {verifyAuth} from "./AuthReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';


export const AppReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

const setInitialized = () => ({type: SET_INITIALIZED});

export const initializeApp = () => async (dispatch) => {
    await dispatch(verifyAuth());
    dispatch(setInitialized());
};