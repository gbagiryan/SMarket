import {profileApi} from "../../api/api";

const PROFILE_SET_PROFILE = 'PROFILE_SET_PROFILE';

export const ProfileReducer = (state = {}, action) => {
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
    const res = await profileApi.getUserProfile(userId);
    if (res && res.data) {
        dispatch(setUserProfile(res.data));
    }
};