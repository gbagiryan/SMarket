import {authApi} from "../../api/api";

const AUTH_SET_AUTHED_USER_ID = 'AUTH_SET_AUTHED_USER_ID';

export const AuthReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_SET_AUTHED_USER_ID:
            return {
                ...state,
                authedUserData: action.authedUserData,
                isAuthed: action.isAuthed
            }
        default:
            return state;
    }
};

const setAuthedUserData = (authedUserData, isAuthed) => ({type: AUTH_SET_AUTHED_USER_ID, authedUserData, isAuthed});

export const verifyAuth = () => async (dispatch) => {
    const res = await authApi.verifyAuth();
    if (!res.data === false) {
        dispatch(setAuthedUserData(res.data, true));
    } else {
        dispatch(setAuthedUserData(null, false));
    }

};

export const login = (email, password) => async (dispatch) => {
    const res = await authApi.login(email, password);
    if (res.status===200) {
        dispatch(setAuthedUserData(res.data, true));
    } else {
        dispatch(setAuthedUserData(null, false));
    }
}
export const logout = () => async (dispatch) => {
    await authApi.logout();
    dispatch(setAuthedUserData(null, false));
}
export const register = (email, username, password, firstName, lastName) => async (dispatch) => {
    await authApi.register(email, username, password, firstName, lastName);
}