import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, minLength, required} from "../Common/Validators/Validators";
import {makeStyles} from "@material-ui/core";
import {renderTextField} from "../Common/MaterialUiForm/FormFields";


const maxLength100 = maxLength(100);
const minLength10 = minLength(10);

const useStyles = makeStyles({});

const EditProduct = (props) => {
    const classes = useStyles();

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Product Name'} name={'productName'} component={renderTextField}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Description'} name={'description'} component={renderTextField}
                       validate={[required, minLength10, maxLength100]}/>
            </div>
            <div>
                <Field placeholder={'Price'} name={'price'} component={renderTextField} type={Number}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Category'} name={'category'} component={renderTextField}
                       validate={[required]}/>
            </div>
            <input onChange={props.handleAddedPhoto} type={'file'}/>
            <button>Save</button>
        </form>
    )
}

export const EditProductReduxForm = reduxForm({form: 'editProfile'})(EditProduct);