import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import {Button, makeStyles} from "@material-ui/core";
import {required} from "../Common/Validators/Validators";
import Grid from "@material-ui/core/Grid";
import Loading from "../Common/Loading/Loading";
import {Error} from "../Common/Messages/Messages";
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
        minHeight: 450,
        width: 350,
    }
}));

const LoginForm = (props) => {

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

                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Login</Button>
                    {props.isLoading &&
                    <Loading/>
                    }
                </Grid>
            </form>
        </Paper>
    )
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);