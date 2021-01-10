import React, {useState} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {PostProductReduxForm} from "./PostProductForm";
import {postProduct} from "../../redux/reducers/AuthReducer";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";

const PostProductContainer = (props) => {

    const imageMaxSize = 1024 * 1024 * 10;
    const validFormats = ['image/png', 'image/x-png', 'image/jpg', 'image/jpeg'];
    const multipleUpload = true;

    const [productPictures, setProductPictures] = useState()

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            alert(rejectedFiles[0].errors[0].message)
        } else if (files && files.length > 0) {
            setProductPictures(files)
        }
    }

    const handlePostProduct = (form) => {
        const formData = new FormData();
        formData.append('productName', form.productName);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category', form.category);
        productPictures.map(pic=> formData.append('productPictures', pic));
        // formData.append('productPictures', productPictures);

        props.postProduct(formData);
    }

    return (
        <div>
            <h1>Add new listing</h1>
            <div>
                <PostProductReduxForm onSubmit={handlePostProduct}
                                      isLoading={props.isLoading} errorMsg={props.errorMsg}
                                      successMsg={props.successMsg} handleDrop={handleDrop} imageMaxSize={imageMaxSize}
                                      validFormats={validFormats} multipleUpload={multipleUpload}/>
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