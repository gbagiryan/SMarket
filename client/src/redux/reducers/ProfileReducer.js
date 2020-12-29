import {profileApi} from "../../api/api";
import {setErrorMsg, setLoading} from "./AppReducer";

const PROFILE_SET_PROFILE = 'PROFILE_SET_PROFILE';

const initialState = {
    profile: null
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
};

export const setUserProfile = (profile) => ({type: PROFILE_SET_PROFILE, profile});

export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await profileApi.getUserProfile(userId);
        dispatch(setUserProfile(res.data));
        dispatch(setLoading(false));
    } catch (e) {
        console.log(e.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.errorMessage));
    }
};