import React from 'react';
import {connect} from "react-redux";
import {register} from "../../redux/reducers/AuthReducer";
import {RegisterReduxForm} from "./RegisterForm";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {Redirect} from "react-router-dom";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";
import {PostProductReduxForm} from "../PostProduct/PostProductForm";

const RegisterContainer = (props) => {

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

    const onRegisterSubmit = (formData) => {
        props.register(formData.email, formData.username, formData.password, formData.firstName, formData.lastName)
    }

    return (
        <RegisterReduxForm onSubmit={onRegisterSubmit} isLoading={props.isLoading}
                           errorMsg={props.errorMsg} successMsg={props.successMsg}/>
    )
};

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state),
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});

const actionCreators = {
    register
}

export default connect(mapStateToProps, actionCreators)(RegisterContainer);