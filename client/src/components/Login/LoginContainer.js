import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/AuthReducer";
import {NavLink} from "react-router-dom";

const LoginContainer = (props) => {

    const onLoginSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    return (
        <div>
            <div>
                <LoginReduxForm onSubmit={onLoginSubmit}/>
            </div>
            <NavLink to={'/register'}>Create account</NavLink>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    login
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);