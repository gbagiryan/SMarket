import React, {useEffect} from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/AuthReducer";
import {Redirect} from "react-router-dom";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";
import {clearMessages} from "../../redux/reducers/AppReducer";

const LoginContainer = (props) => {
    useEffect(() => {
        return () => {
            props.clearMessages()
        }
    }, []);

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

    const onLoginSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    return (
        <LoginReduxForm onSubmit={onLoginSubmit} isLoading={props.isLoading} errorMsg={props.errorMsg}
                        successMsg={props.successMsg}/>
    )
};

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state),
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});

const actionCreators = {
    login,
    clearMessages
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);