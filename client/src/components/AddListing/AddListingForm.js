import React from 'react';
import {Field, reduxForm} from "redux-form";

const AddListingForm = (props) => {
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

export const AddListingReduxForm = reduxForm({form: 'addListing'})(AddListingForm);