import React from 'react';
import {connect} from "react-redux";
import {Header} from "./Header";
import {logout} from "../../redux/reducers/AuthReducer";
import {getIsAuthed} from "../../redux/selectors/authSelectors";

export const HeaderContainer = React.memo((props) => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleToggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <Header isAuthed={props.isAuthed}
                    logout={props.logout}
                    modalOpen={modalOpen}
                    handleToggleModal={handleToggleModal}
                    handleChangeTab={handleChangeTab}
                    selectedTab={selectedTab}
            />
        </div>
    )
});

const mapStateToProps = (state) => ({
    isAuthed: getIsAuthed(state)
});

const actionCreators = {
    logout
};

export default connect(mapStateToProps, actionCreators)(HeaderContainer);