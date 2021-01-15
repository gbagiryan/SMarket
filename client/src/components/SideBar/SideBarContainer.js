import React from 'react';
import {connect} from "react-redux";
import {SideBar} from "./SideBar";
import {getAuthedUserData, getIsAuthed} from "../../redux/selectors/authSelectors";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: '80vh',
        padding: theme.spacing(2)
    }
}));

const SideBarContainer = (props) => {
    const classes = useStyles();

    return (
        <Paper elevation={4} className={classes.paper}>
            <SideBar authedUserData={props.authedUserData} isAuthed={props.isAuthed}/>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    authedUserData: getAuthedUserData(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SideBarContainer);