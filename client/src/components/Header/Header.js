import React from 'react';
import styles from './Header.module.css';
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles.header}>
            <NavLink exact to={'/'} className={styles.logo}>
                SMarket
            </NavLink>
            <div className={styles.loginBlock}>
                <NavLink to={'/login'}  activeClassName={styles.active} className={styles.item}>
                    Login
                </NavLink>
                <NavLink to={'/profile'}  activeClassName={styles.active} className={styles.item}>
                    Profile
                </NavLink>
            </div>
        </div>
    )
}