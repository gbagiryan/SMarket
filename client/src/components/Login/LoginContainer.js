import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/AuthReducer";
import {Redirect} from "react-router-dom";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {getIsLoading} from "../../redux/selectors/appSelectors";

const LoginContainer = (props) => {

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

    const onLoginSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    return (
        <LoginReduxForm onSubmit={onLoginSubmit} isLoading={props.isLoading}/>
    )
};

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state),
    isLoading: getIsLoading(state)
});

const actionCreators = {
    login
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);