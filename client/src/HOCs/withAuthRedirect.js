import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

function mapStateToProps(state) {
    return ({
        isAuthed: state.auth.isAuthed
    });
}

export const withAuthRedirect = (Component) => {
    const withRedirectComponent = (props) => {
        if (!props.isAuthed) {
            return <Redirect to={'/'}/>
        }
        return <Component {...props}/>;
    }
    return connect(mapStateToProps)(withRedirectComponent);
};