import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/reducers/ProfileReducer";

const ProfileContainer = React.memo((props) => {

    useEffect(() => {
        let userId = props.match.params.userId;
        if (!userId) {
            userId = props.authedUserId;
        }

        props.getUserProfile(userId);
    }, [props.match.params.userId])

    return (
        <div>
            <Profile profile={props.profile}/>
        </div>
    );
});

const mapStateToProps = (state) => ({
    authedUserId: state.auth.authedUserId,
    profile: state.profileReducer.profile
});

const actionCreators = {
    getUserProfile
};

export default connect(mapStateToProps, actionCreators)(ProfileContainer);