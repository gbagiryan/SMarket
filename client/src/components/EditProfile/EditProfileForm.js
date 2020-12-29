import React from "react";
import {Field, reduxForm} from "redux-form";

const EditProfile = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} component={'input'} type="email"/>
            </div>
            <div>
                <Field placeholder={'Username'} name={'username'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Name'} name={'firstName'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Last Name'} name={'lastName'} component={'input'}/>
            </div>
            <input onChange={props.handleAddedPhoto} type={'file'}/>
            <button>Edit</button>
        </form>
    )
}

export const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfile);