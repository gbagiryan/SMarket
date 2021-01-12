import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {register} from "../../redux/reducers/AuthReducer";
import {RegisterReduxForm} from "./RegisterForm";
import {getIsAuthed} from "../../redux/selectors/authSelectors";
import {Redirect} from "react-router-dom";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";

const RegisterContainer = (props) => {

    const [profilePictures, setProfilePictures] = useState([])
    const [profileThumbs, setProfileThumbs] = useState([])

    useEffect(() => {
        setProfileThumbs(profilePictures.map(pic => URL.createObjectURL(pic)));
    }, [profilePictures]);

    const imageMaxSize = 1024 * 1024 * 10;
    const validFormats = ['image/png', 'image/x-png', 'image/jpg', 'image/jpeg'];
    const multipleUpload = false;
    const dropZoneText = 'Please Drop/Select image here';
    const maxFilesToShow = 1;

    const handleClick = (index) => {
        setProfilePictures(profilePictures.filter(img => profilePictures.indexOf(img) !== index));
    }

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            alert(rejectedFiles[0].errors[0].message)
        }
        if (files && files.length > 0) {
            setProfilePictures([...profilePictures, ...files])
        }
    }

    const handleRegisterSubmit = (form) => {
        const formData = new FormData();
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('profilePicture', profilePictures[0]);

        props.register(formData)
    }

    return (
        props.isAuthed
            ? <Redirect to={'/profile'}/>
            : <RegisterReduxForm onSubmit={handleRegisterSubmit} isLoading={props.isLoading}
                                 errorMsg={props.errorMsg} successMsg={props.successMsg} handleDrop={handleDrop}
                                 imageMaxSize={imageMaxSize} validFormats={validFormats}
                                 multipleUpload={multipleUpload} thumbs={profileThumbs}
                                 maxFilesToShow={maxFilesToShow} dropZoneText={dropZoneText} handleClick={handleClick}/>
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