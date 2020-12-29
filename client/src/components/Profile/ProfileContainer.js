import React, {useEffect} from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/reducers/ProfileReducer";
import {getProfile} from "../../redux/selectors/profileSelectors";
import {compose} from "redux";

const ProfileContainer = React.memo((props) => {

    useEffect(() => {
        let userId = props.match.params.userId;
        props.getUserProfile(userId);

    }, [props.match.params.userId])

    return (
        <div>
            <Profile profile={props.profile}/>
        </div>
    );
});

const mapStateToProps = (state) => ({
    profile: getProfile(state)
});

const actionCreators = {
    getUserProfile
};

export default compose(
    connect(mapStateToProps, actionCreators)
)(ProfileContainer);