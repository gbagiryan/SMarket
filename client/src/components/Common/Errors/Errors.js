import React from 'react';
import styles from './Errors.module.css';

const Errors = (props) => {
    return (
        <div className={styles.errorMsg}>
            <p>{props.errorMsg}</p>
        </div>
    );
};

export default Errors;