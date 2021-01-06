import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import {Button, makeStyles} from "@material-ui/core";
import {required} from "../Common/Validators/Validators";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loading from "../Common/Loading/Loading";

const useStyles = makeStyles(theme => ({
    form: {
        margin: theme.spacing(2)
    },
    button: {
        margin: '16px auto'
    }
}));

const LoginForm = (props) => {

    const classes = useStyles();

    return (
        props.isLoading
            ? <Loading/>
            : <form className={classes.form} onSubmit={props.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Email'} name={'email'} component={renderTextField}
                               label={'Email'}
                               type="email" validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Password'} name={'password'} component={renderTextField}
                               label={'Password'}
                               type="password" validate={[required]}/>
                    </Grid>
                </Grid>
                <Button fullWidth type={"submit"} variant="contained" color="primary"
                        className={classes.button}>Login</Button>
            </form>
    )
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);