import React from 'react';
import {Field, reduxForm} from "redux-form";

const RegisterForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'} component={'input'} type="email"/>
                </div>
                <div>
                    <Field placeholder={'Username'} name={'username'} component={'input'}/>
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} component={'input'} type="password"/>
                </div>
                <div>
                    <Field placeholder={'Name'} name={'firstName'} component={'input'}/>
                </div>
                <div>
                    <Field placeholder={'Last Name'} name={'lastName'} component={'input'}/>
                </div>

                <button>Register</button>
            </form>
        </div>
    )
};

export const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);