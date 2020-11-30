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
    try {
        const result = await authApi.verifyAuth();
        if (result.status === 200) {
            dispatch(setAuthedUserData(result.data, true));
        }else{
            dispatch(setAuthedUserData(null, false));
        }
    }catch (e) {
        console.log("ERROR" + e.message)
    }

};
export const login = (email, password) => async (dispatch) => {
    await authApi.login(email, password);
    dispatch(verifyAuth());
}
export const logout = () => async (dispatch) => {
    await authApi.logout();
    dispatch(setAuthedUserData(null, false));
}
export const register = (email, password, firstName, lastName) => async (dispatch) => {
    await authApi.register(email, password, firstName, lastName);
}