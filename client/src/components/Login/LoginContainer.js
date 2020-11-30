import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login,register} from "../../redux/reducers/AuthReducer";
import {RegisterReduxForm} from "./RegisterForm";

const LoginContainer = (props) => {

    const onLoginSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }
    const onRegisterSubmit = (formData) => {
        props.register(formData.email, formData.password, formData.firstName, formData.lastName)
    }

    return (
        <div>
            <h1>LOGIN PAGE</h1>
            <div>
                <LoginReduxForm onSubmit={onLoginSubmit}/>
            </div>
            <div>
                <RegisterReduxForm onSubmit={onRegisterSubmit}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    login,
    register
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);