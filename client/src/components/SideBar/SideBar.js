import React from 'react';
import styles from './SideBar.module.css';
import {Link, NavLink} from "react-router-dom";
import noAvatar from '../../assets/images/noAvatar.png';
import {ListItem, ListItemText, List, ListItemIcon} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

export const SideBar = React.memo((props) => {

    return (
        <List>
            {props.isAuthed &&
            <div className={styles.avatarContainer}>
                <NavLink exact to={'/profile'}>
                    {props.authedUserData.profilePicture
                        ? <img alt={'userAvatar'} src={props.authedUserData.profilePicture}
                               className={styles.avatar}/>
                        : <img alt={'userAvatar'} src={noAvatar} className={styles.avatar}/>}
                </NavLink>
            </div>
            }
            {props.isAuthed &&
            <ListItem component={Link} to={'/add_new_listing'} button key={'Add_new_listing'}>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary={'Add new listing'}/>
            </ListItem>
            }
            <ListItem component={Link} to={'#'} button key={'Add_new_listing'}>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary={'placeholder'}/>
            </ListItem>
        </List>
    )
});