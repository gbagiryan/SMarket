import React from 'react';
import {NavLink, Link} from "react-router-dom";
import styles from './Header.module.css'

export const Header = (props) => {
    return (
        <div className={styles.header}>
            <Link exact to={'/'} className={styles.logo}>
                SMarket
            </Link>
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