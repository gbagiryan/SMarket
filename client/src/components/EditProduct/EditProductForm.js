import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, minLength, required} from "../Common/Validators/Validators";
import {Button, makeStyles} from "@material-ui/core";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import Grid from "@material-ui/core/Grid";
import {Error, Success} from "../Common/Messages/Messages";
import Loading from "../Common/Loading/Loading";
import Paper from "@material-ui/core/Paper";
import {DropZone} from "../Common/DropZone/DropZone";


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
        minHeight: 450,
        width: 350,
    }
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
                        <DropZone handleDrop={props.handleDrop} imageMaxSize={props.imageMaxSize}
                                  validFormats={props.validFormats} multipleUpload={props.multipleUpload}
                                  maxFiles={props.maxFiles} dropZoneText={props.dropZoneText}
                                  thumbs={props.thumbs} handleClick={props.handleClick}
                                  maxFilesToShow={props.maxFilesToShow}/>
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