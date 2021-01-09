import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, makeStyles} from "@material-ui/core";
import {required, validEmail} from "../Common/Validators/Validators";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import Loading from "../Common/Loading/Loading";
import Grid from "@material-ui/core/Grid";
import {Error, Success} from "../Common/Messages/Messages";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    form: {
        margin: theme.spacing(2)
    },
    button: {
        margin: '16px auto'
    },
    paperStyle: {
        padding: 20,
        margin: 'auto',
        height: 450,
        width: 350,
    },
}));

const EditProfile = (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paperStyle}>
            <form className={classes.form}  onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    {props.errorMsg &&
                    <Grid item xs={12}>
                        <Error errorMsg={props.errorMsg}/>
                    </Grid>
                    }
                    {props.successMsg &&
                    <Grid item xs={12}>
                        <Success successMsg={props.successMsg}/>
                    </Grid>
                    }
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Email'} name={'email'} component={renderTextField} type="email"
                               validate={[required, validEmail]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Username'} name={'username'} component={renderTextField}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Name'} name={'firstName'} component={renderTextField}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Last Name'} name={'lastName'} component={renderTextField}
                               validate={[required]}/>
                    </Grid>
                    <input onChange={props.handleAddedPhoto} type={'file'}/>
                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Edit</Button>
                    {props.isLoading &&
                    <Loading/>
                    }
                </Grid>
            </form>
        </Paper>
    )
}

export const EditProfileReduxForm = reduxForm({form: 'editProfile'})(EditProfile);