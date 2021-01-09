import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {PostProductReduxForm} from "./PostProductForm";
import {postProduct} from "../../redux/reducers/AuthReducer";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";
import {EditProductReduxForm} from "../EditProduct/EditProductForm";

const PostProductContainer = (props) => {

    const onAddListingSubmit = (formData) => {
        props.postProduct(formData);
    }

    return (
        <div>
            <h1>Add new listing</h1>
            <div>
                <PostProductReduxForm onSubmit={onAddListingSubmit}
                                      isLoading={props.isLoading} errorMsg={props.errorMsg}
                                      successMsg={props.successMsg}/>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});

const actionCreators = {
    postProduct
}

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(PostProductContainer);