import React from 'react';
import styles from './SideBar.module.css';
import {NavLink} from "react-router-dom";
import noAvatar from '../../assets/images/noAvatar.png';

export const SideBar = () => {
    return (
        <div className={styles.sideBar}>
            <div className={styles.avatarContainer}>
                <NavLink exact to={'/profile'}>
                    <img alt={'userAvatar'} src={noAvatar} className={styles.avatar}/>
                </NavLink>
            </div>

            <div className={styles.navContainer}>
                <div>
                    <NavLink exact to={'/cat'} activeClassName={styles.active} className={styles.item}>
                        Category
                    </NavLink>
                </div>
                <div>
                    <NavLink to={'/pri'} activeClassName={styles.active} className={styles.item}>
                        Price Range
                    </NavLink>
                </div>
            </div>
        </div>
    )
}