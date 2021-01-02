import React from 'react';
import {connect} from "react-redux";
import {SideBar} from "./SideBar";
import {getAuthedUserData, getIsAuthed} from "../../redux/selectors/authSelectors";

const SideBarContainer = (props) => {
    return (
        <div>
            <SideBar authedUserData={props.authedUserData} isAuthed={props.isAuthed}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    authedUserData: getAuthedUserData(state),
    isAuthed: getIsAuthed(state)
});

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(SideBarContainer);