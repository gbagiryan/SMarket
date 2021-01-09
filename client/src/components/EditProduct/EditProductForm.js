import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, minLength, required} from "../Common/Validators/Validators";
import {Button, makeStyles} from "@material-ui/core";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import Grid from "@material-ui/core/Grid";
import {Error, Success} from "../Common/Messages/Messages";
import Loading from "../Common/Loading/Loading";
import Dropzone from "react-dropzone";
import Paper from "@material-ui/core/Paper";


const maxLength100 = maxLength(100);
const minLength10 = minLength(10);

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
    dropzone: {}
}));

const EditProduct = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperStyle}>
            <form onSubmit={props.handleSubmit}>
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
                        <Field fullWidth placeholder={'Product Name'} name={'productName'} component={renderTextField}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Description'} name={'description'} component={renderTextField}
                               validate={[required, minLength10, maxLength100]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Price'} name={'price'} component={renderTextField} type={Number}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Field fullWidth placeholder={'Category'} name={'category'} component={renderTextField}
                               validate={[required]}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Dropzone onDrop={props.handleDrop} multiple accept={''} maxSize={props.imageMaxSize}>
                            {
                                ({getRootProps, getInputProps}) => (
                                    <Paper className={classes.dropzone} variant={'outlined'} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop here</p>
                                    </Paper>
                                )
                            }
                        </Dropzone>
                    </Grid>
                    <Button fullWidth type={"submit"} variant="contained" color="primary"
                            className={classes.button}>Save</Button>
                    {props.isLoading &&
                    <Loading/>
                    }
                </Grid>
            </form>
        </Paper>
    )
}

export const EditProductReduxForm = reduxForm({form: 'editProfile'})(EditProduct);