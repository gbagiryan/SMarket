import React from 'react';
import styles from './Errors.module.css';

export const Error = (props) => {
    return (
        <div className={styles.errorMsg}>
            <p>{props.errorMsg}</p>
        </div>
    );
};
export const Success = (props) => {
    return (
        <div className={styles.errorMsg}>
            <p>{props.errorMsg}</p>
        </div>
    );
};