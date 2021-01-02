import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LoginContainer from "../Login/LoginContainer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RegisterContainer from "../Register/RegisterContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const Header = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component={Link} to={'/'} variant="h2" className={classes.title}>
                    SMarket
                </Typography>
                {props.isAuthed
                    ? <div>
                        <Button component={Link} to={'/profile'} color="inherit">Profile</Button>
                        <Button onClick={props.logout} color="inherit">Logout</Button>
                    </div>
                    : <div>
                        <Button variant="outlined" color="inherit" onClick={props.handleToggleModal}>
                            Log in
                        </Button>
                        <Button variant="outlined" color="inherit" onClick={props.handleToggleModal}>
                            Register
                        </Button>
                        <Dialog open={props.modalOpen} onClose={props.handleToggleModal}>
                            <AppBar position="static">
                                <Tabs value={props.selectedTab} onChange={props.handleChangeTab}>
                                    <Tab label="Log in"/>
                                    <Tab label="Register"/>
                                </Tabs>
                            </AppBar>
                            <DialogContent>
                                {props.selectedTab === 0 && <LoginContainer/>}
                                {props.selectedTab === 1 && <RegisterContainer/>}
                            </DialogContent>
                        </Dialog>
                    </div>
                }
            </Toolbar>
        </AppBar>


        // <div className={styles.header}>
        //     <Link exact to={'/'} className={styles.logo}>
        //         SMarket
        //     </Link>
        //     <div className={styles.loginBlock}>
        //         {props.isAuthed
        //             ? <div>
        //                 <NavLink to={'/profile'} activeClassName={styles.active} className={styles.item}>
        //                     Profile
        //                 </NavLink>
        //                 <button onClick={props.logout}>Logout</button>
        //             </div>
        //
        //             : <NavLink to={'/register'} activeClassName={styles.active} className={styles.item}>
        //                 Register
        //             </NavLink>
        //         }
        //     </div>
        // </div>
    )
};