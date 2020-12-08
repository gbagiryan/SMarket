import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {AddListingReduxForm} from "./AddListingForm";
import {addNewListing} from "../../redux/reducers/ProductReducer";

const AddListingContainer = (props) => {

    const onAddListingSubmit = (formData) => {
        props.addNewListing(formData);
    }

    return (
        <div>
            <h1>Add new listing</h1>
            <div>
                <AddListingReduxForm onSubmit={onAddListingSubmit}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    addNewListing
}

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(AddListingContainer);