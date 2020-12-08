import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

export const Header = (props) => {
    return (
        <div className={styles.header}>
            <NavLink exact to={'/'} className={styles.logo}>
                SMarket
            </NavLink>
            <div className={styles.loginBlock}>
                {props.isAuthed
                    ? <div>
                        <NavLink to={'/profile'} activeClassName={styles.active} className={styles.item}>
                            Profile
                        </NavLink>
                        <button onClick={props.logout}>Logout</button>
                    </div>

                    : <NavLink to={'/register'} activeClassName={styles.active} className={styles.item}>
                        Register
                    </NavLink>
                }
            </div>
        </div>
    )
};