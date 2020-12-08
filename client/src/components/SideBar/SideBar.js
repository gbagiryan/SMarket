import React from 'react';
import styles from './SideBar.module.css';
import {NavLink} from "react-router-dom";
import noAvatar from '../../assets/images/noAvatar.png';
import LoginContainer from "../Login/LoginContainer";

export const SideBar = React.memo((props) => {

    return (
        <div>
            {props.isAuthed
                ? <div className={styles.avatarContainer}>
                    <NavLink exact to={'/profile'}>
                        <img alt={'userAvatar'} src={noAvatar} className={styles.avatar}/>
                    </NavLink>
                </div>
                : <div className={styles.sideBar}>
                    <LoginContainer/>
                </div>
            }
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
                {props.isAuthed
                    ? <div>
                        <NavLink to={'/add_new_listing'} activeClassName={styles.active} className={styles.item}>
                            Add new listing
                        </NavLink>
                    </div>
                    : null
                }
            </div>
        </div>
    )
});