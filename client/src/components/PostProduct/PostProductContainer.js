import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {PostProductReduxForm} from "./PostProductForm";
import {postProduct} from "../../redux/reducers/AuthReducer";

const PostProductContainer = (props) => {

    const onAddListingSubmit = (formData) => {
        props.postProduct(formData);
    }

    return (
        <div>
            <h1>Add new listing</h1>
            <div>
                <PostProductReduxForm onSubmit={onAddListingSubmit}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({});

const actionCreators = {
    postProduct
}

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(PostProductContainer);