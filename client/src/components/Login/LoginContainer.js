import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/AuthReducer";

const LoginContainer = (props) => {

    const onLoginSubmit = (formData) => {
        props.login(formData.email, formData.password)
    }

    return (
        <div>
            <div>
                <LoginReduxForm onSubmit={onLoginSubmit}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    login
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);