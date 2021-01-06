import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";
import {maxLength, minLength, required} from "../Common/Validators/Validators";
import {Button, makeStyles} from "@material-ui/core";

const maxLength100 = maxLength(100);
const minLength10 = minLength(10);

const useStyles = makeStyles({});

const PostProductForm = (props) => {
    const classes = useStyles();

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Product Name'} name={'productName'} component={renderTextField} type="input"
                           validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={'Product Description'} name={'description'} component={renderTextField}
                           validate={[required, minLength10, maxLength100]}/>
                </div>
                <div>
                    <Field placeholder={'Product Price'} name={'price'} component={renderTextField} type="number"
                           validate={[required]}/>
                </div>
                <div>
                    <Field placeholder={'Product Category'} name={'category'} component={renderTextField}
                           validate={[required]}/>
                </div>
                <Button type={"submit"} variant="contained" color="secondary" className={classes.button}>Add</Button>
            </form>
        </div>
    )
};

export const PostProductReduxForm = reduxForm({form: 'postProduct'})(PostProductForm);