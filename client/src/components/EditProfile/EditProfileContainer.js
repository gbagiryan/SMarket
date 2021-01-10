import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {EditProfileReduxForm} from "./EditProfileForm";
import {editProfile} from "../../redux/reducers/AuthReducer";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";

const EditProfileContainer = (props) => {

    const imageMaxSize = 1024 * 1024 * 10;
    const validFormats = ['image/png', 'image/x-png', 'image/jpg', 'image/jpeg'];
    const multipleUpload = false;

    const [profilePicture, setProfilePicture] = useState('')

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            alert(rejectedFiles[0].errors[0].message)
        }
        if (files && files.length > 0) {
            setProfilePicture(files[0])
        }
    }

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('email', form.email);
        formData.append('username', form.username);
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('profilePicture', profilePicture);

        props.editProfile(formData);
    }
    return (
        <div>
            <EditProfileReduxForm onSubmit={handleEdit} isLoading={props.isLoading} errorMsg={props.errorMsg}
                                  successMsg={props.successMsg} handleDrop={handleDrop} imageMaxSize={imageMaxSize}
                                  validFormats={validFormats} multipleUpload={multipleUpload}/>
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