import React from 'react';
import {connect} from "react-redux";
import {Header} from "./Header";
import {logout} from "../../redux/reducers/AuthReducer";

export const HeaderContainer = React.memo((props) => {
    return (
        <div>
            <Header isAuthed={props.isAuthed} logout={props.logout}/>
        </div>
    )
});

const mapStateToProps = (state) => ({
    isAuthed: state.auth.isAuthed
});

const actionCreators = {
    logout
};

export default connect(mapStateToProps, actionCreators)(HeaderContainer);