import React, {useState} from 'react';
import {connect} from "react-redux";
import {register} from "../../redux/reducers/AuthReducer";
import {RegisterReduxForm} from "./RegisterForm";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {Redirect} from "react-router-dom";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";

const RegisterContainer = (props) => {

    const imageMaxSize = 1024 * 1024 * 10;
    const validFormats = ['image/png', 'image/x-png', 'image/jpg', 'image/jpeg'];
    const multipleUpload = false;

    const [profilePicture, setProfilePicture] = useState('')

    if (props.isAuthed) {
        return <Redirect to={'/profile'}/>
    }

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            alert(rejectedFiles[0].errors[0].message)
        }
        if (files && files.length > 0) {
            setProfilePicture(files[0])
        }
    }

    const handleRegisterSubmit = (form) => {
        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('profilePicture', profilePicture);

        props.register(formData)
    }

    return (
        <RegisterReduxForm onSubmit={handleRegisterSubmit} isLoading={props.isLoading}
                           errorMsg={props.errorMsg} successMsg={props.successMsg} handleDrop={handleDrop}
                           imageMaxSize={imageMaxSize} validFormats={validFormats}
                           multipleUpload={multipleUpload}/>
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