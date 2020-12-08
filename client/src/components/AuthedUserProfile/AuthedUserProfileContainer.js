import React from 'react';
import {connect} from "react-redux";
import {getAuthedUserData} from "../../redux/selectors/authSelectors";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {AuthedUserProfile} from "./AuthedUserProfile";

const AuthedUserProfileContainer = React.memo((props) => {

    return (
        <div>
            <AuthedUserProfile profile={props.profile}/>
        </div>
    );
});

const mapStateToProps = (state) => ({
    profile: getAuthedUserData(state),
});

const actionCreators = {};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(AuthedUserProfileContainer);