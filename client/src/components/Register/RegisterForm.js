import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import {Button, makeStyles} from "@material-ui/core";
import {minLength, passwordsMatch, required, validEmail} from "../Common/Validators/Validators";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Loading from "../Common/Loading/Loading";

const useStyles = makeStyles(theme => ({
    form: {
        margin: theme.spacing(2)
    },
    button: {
        margin: '16px auto'
    },
    paperStyle: {
        padding: 20,
        margin: '20px auto',
        height: 450,
        width: 350,
    }
}));

const minLength6 = minLength(6);

const RegisterForm = (props) => {

    const classes = useStyles();

    return (
        props.isLoading
            ? <Loading/>
            : <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
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
                </Grid>

                <Button fullWidth type={"submit"} variant="contained" color="primary"
                        className={classes.button}>Register</Button>
            </form>
    )
};

export const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);