import {profileApi} from "../../api/api";
import {setErrorMsg, setLoading} from "./AppReducer";

const PROFILE_SET_PROFILE = 'PROFILE_SET_PROFILE';
const PROFILE_CLEAR_DATA = 'PROFILE_CLEAR_DATA';

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
        case PROFILE_CLEAR_DATA:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
};

export const profileClearData = () =>({type: PROFILE_CLEAR_DATA});
export const setUserProfile = (profile) => ({type: PROFILE_SET_PROFILE, profile});

export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await profileApi.getUserProfile(userId);
        dispatch(setUserProfile(res.data));
        dispatch(setLoading(false));
    } catch (e) {
        console.log(e.response.data.errorMessage);
        dispatch(setLoading(false));
        dispatch(setErrorMsg(e.response.data.errorMessage));
    }
};