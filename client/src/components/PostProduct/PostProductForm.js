import React from 'react';
import {Field, reduxForm} from "redux-form";

const PostProductForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Product Name'} name={'productName'} component={'input'} type="input"/>
                </div>
                <div>
                    <Field placeholder={'Product Description'} name={'description'} component={'input'}/>
                </div>
                <div>
                    <Field placeholder={'Product Price'} name={'price'} component={'input'} type="number"/>
                </div>
                <div>
                    <Field placeholder={'Product Category'} name={'category'} component={'input'}/>
                </div>

                <button>Add</button>
            </form>
        </div>
    )
};

export const PostProductReduxForm = reduxForm({form: 'postProduct'})(PostProductForm);