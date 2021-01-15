import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
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
    }
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
                        <Dialog classes={classes.paper} open={props.modalOpen}
                                onClose={props.handleToggleModal}>
                            <AppBar position="static" fullWidth>
                                <Tabs centered variant="fullWidth" value={props.selectedTab}
                                      onChange={props.handleChangeTab}>
                                    <Tab label="Log in"/>
                                    <Tab label="Register"/>
                                </Tabs>
                            </AppBar>
                            {props.selectedTab === 0 && <LoginContainer/>}
                            {props.selectedTab === 1 && <RegisterContainer/>}
                        </Dialog>
                    </div>
                }
            </Toolbar>
        </AppBar>
    )
};