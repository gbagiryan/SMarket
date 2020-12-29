import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {EditProfileReduxForm} from "./EditProfileForm";
import {editProfile} from "../../redux/reducers/AuthReducer";

const EditProfileContainer = (props) => {
    const [profilePicture, setProfilePicture] = useState('')

    const handleAddedPhoto = (event) => {
        if (event.target.files.length) {
            setProfilePicture(event.target.files[0])
        }
    }

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('email', form.email ? form.email : '');
        formData.append('username', form.username ? form.username : '');
        formData.append('firstName', form.firstName ? form.firstName : '');
        formData.append('lastName', form.lastName ? form.lastName : '');
        formData.append('profilePicture', profilePicture);

        props.editProfile(formData);
    }
    return (
        <div>
            <EditProfileReduxForm onSubmit={handleEdit} handleAddedPhoto={handleAddedPhoto}/>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    editProfile
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(EditProfileContainer);