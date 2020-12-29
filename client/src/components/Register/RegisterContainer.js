import React from 'react';
import {connect} from "react-redux";
import {register} from "../../redux/reducers/AuthReducer";
import {RegisterReduxForm} from "./RegisterForm";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {Redirect} from "react-router-dom";

const RegisterContainer = (props) => {

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

    const onRegisterSubmit = (formData) => {
        props.register(formData.email, formData.username, formData.password, formData.firstName, formData.lastName)
    }

    return (
        <div>
            <RegisterReduxForm onSubmit={onRegisterSubmit}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    register
}

export default connect(mapStateToProps, actionCreators)(RegisterContainer);