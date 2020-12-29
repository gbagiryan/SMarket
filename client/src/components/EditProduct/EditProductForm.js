import React from "react";
import {Field, reduxForm} from "redux-form";

const EditProduct = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Product Name'} name={'productName'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Description'} name={'description'} component={'input'}/>
            </div>
            <div>
                <Field placeholder={'Price'} name={'price'} component={'input'} type={Number}/>
            </div>
            <div>
                <Field placeholder={'Category'} name={'category'} component={'input'}/>
            </div>
            <input onChange={props.handleAddedPhoto} type={'file'}/>
            <button>Save</button>
        </form>
    )
}

export const EditProductReduxForm = reduxForm({form: 'editProfile'})(EditProduct);