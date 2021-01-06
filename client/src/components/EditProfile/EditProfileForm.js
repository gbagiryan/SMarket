import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, makeStyles} from "@material-ui/core";
import {required, validEmail} from "../Common/Validators/Validators";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";

const useStyles = makeStyles({});

const EditProfile = (props) => {

    const classes = useStyles();

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} component={renderTextField} type="email"
                       validate={[required, validEmail]}/>
            </div>
            <div>
                <Field placeholder={'Username'} name={'username'} component={renderTextField}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Name'} name={'firstName'} component={renderTextField}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Last Name'} name={'lastName'} component={renderTextField}
                       validate={[required]}/>
            </div>
            <input onChange={props.handleAddedPhoto} type={'file'}/>
            <Button type={"submit"} variant="contained" color="secondary" className={classes.button}>Edit</Button>
        </form>
    )
}

export const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfile);