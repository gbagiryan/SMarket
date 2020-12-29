import React from 'react';
import {Field, reduxForm} from "redux-form";
import {NavLink} from "react-router-dom";

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} name={'email'} component={'input'} type="email"/>
                </div>
                <div>
                    <Field placeholder={'Password'} name={'password'} component={'input'} type="password"/>
                </div>
                <button>Login</button>
                <NavLink to={'/register'}>Register</NavLink>
            </form>
        </div>
    )
};

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);