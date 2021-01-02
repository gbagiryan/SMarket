import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/reducers/AuthReducer";
import {Redirect} from "react-router-dom";
import {getIsAuthed} from "../../redux/selectors/authSelectors";

const LoginContainer = (props) => {

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

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

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    login
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);