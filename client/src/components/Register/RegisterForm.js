import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import {Button, makeStyles} from "@material-ui/core";
import {minLength, passwordsMatch, required, validEmail} from "../Common/Validators/Validators";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Loading from "../Common/Loading/Loading";
import {Error, Success} from "../Common/Messages/Messages";
import {DropZone} from "../Common/DropZone/DropZone";

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
        minHeight: 450,
        width: 350,
    }
}));

const minLength6 = minLength(6);

const RegisterForm = (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.paperStyle}>
            <form className={classes.form} onSubmit={props.handleSubmit}>
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
                    <Grid item xs={6}>
                        <Field fullWidth placeholder={'Name'} name={'firstName'} component={renderTextField}
                               label={'Name'}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field fullWidth placeholder={'Last Name'} name={'lastName'} component={renderTextField}
                               label={'Last Name'}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field fullWidth placeholder={'Email'} name={'email'} component={renderTextField}
                               label={'Email'}
                               type="email" validate={[required, validEmail]}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Field fullWidth placeholder={'Username'} name={'username'} component={renderTextField}
                               label={'Username'}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Password'} name={'password'} component={renderTextField}
                               label={'Password'}
                               type="password" validate={[required, minLength6]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Confirm Password'} name={'password2'} component={renderTextField}
                               label={'Confirm Password'}
                               type="password" validate={[required, passwordsMatch]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DropZone handleDrop={props.handleDrop} imageMaxSize={props.imageMaxSize}
                                  validFormats={props.validFormats} multipleUpload={props.multipleUpload}
                                  dropZoneText={props.dropZoneText} thumbs={props.thumbs}
                                  handleClick={props.handleClick} maxFilesToShow={props.maxFilesToShow}/>
                    </Grid>
                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Register</Button>
                    {props.isLoading &&
                    <Loading/>
                    }
                </Grid>
            </form>
        </Paper>
    )
};

export const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);