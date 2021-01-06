import React, {useEffect, useState} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/reducers/ProfileReducer";
import {getProfile} from "../../redux/selectors/profileSelectors";
import {compose} from "redux";
import {getAuthedUserData, getIsAuthed} from "../../redux/selectors/authSelectors";
import {Redirect} from "react-router-dom";

const ProfileContainer = React.memo((props) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        let userId = props.match.params.userId;
        if (props.isAuthed && userId === props.authedProfile.id) {
            setShouldRedirect(true)
        }
        props.getUserProfile(userId);

    }, [props.match.params.userId])

    return (
        shouldRedirect
            ? <Redirect to={'/profile'}/>
            : <Profile profile={props.profile}/>
    );
});

const mapStateToProps = (state) => ({
    profile: getProfile(state),
    authedProfile: getAuthedUserData(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    getUserProfile
};

export default compose(
    connect(mapStateToProps, actionCreators)
)(ProfileContainer);