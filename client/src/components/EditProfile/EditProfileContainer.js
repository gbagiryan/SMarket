import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {EditProfileReduxForm} from "./EditProfileForm";
import {editProfile} from "../../redux/reducers/AuthReducer";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";
import {RegisterReduxForm} from "../Register/RegisterForm";

const EditProfileContainer = (props) => {

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

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('email', form.email);
        formData.append('username', form.username);
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('profilePicture', profilePictures[0]);

        props.editProfile(formData);
    }
    return (
        <div>
            <EditProfileReduxForm onSubmit={handleEdit} isLoading={props.isLoading} errorMsg={props.errorMsg}
                                  successMsg={props.successMsg} handleDrop={handleDrop} imageMaxSize={imageMaxSize}
                                  validFormats={validFormats} multipleUpload={multipleUpload} thumbs={profileThumbs}
                                  maxFilesToShow={maxFilesToShow} dropZoneText={dropZoneText} handleClick={handleClick}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});

const actionCreators = {
    editProfile
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(EditProfileContainer);