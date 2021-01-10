import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {EditProductReduxForm} from "./EditProductForm";
import {getProduct} from "../../redux/selectors/productSelectors";
import {requestProduct} from "../../redux/reducers/ProductReducer";
import {editProduct} from "../../redux/reducers/AuthReducer";
import {getErrorMsg, getIsLoading, getSuccessMsg} from "../../redux/selectors/appSelectors";

const EditProductContainer = (props) => {

    const imageMaxSize = 1024 * 1024 * 10;
    const validFormats = ['image/png', 'image/x-png', 'image/jpg', 'image/jpeg'];
    const multipleUpload = true;

    useEffect(() => {
        let productId = props.match.params.productId;
        if (productId) {
            props.requestProduct(productId);
        }
    }, [props.match.params]);

    const [productPicture, setProductPicture] = useState('')

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            alert(rejectedFiles[0].errors[0].message)
        }
        if (files && files.length > 0) {
            setProductPicture(files[0])
        }
    }

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('productId', props.product._id);
        formData.append('productName', form.productName);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('productPictures', productPicture);

        props.editProduct(formData);
    }
    return (
        <div>
            <EditProductReduxForm product={props.product} onSubmit={handleEdit} isLoading={props.isLoading}
                                  errorMsg={props.errorMsg} successMsg={props.successMsg}
                                  handleDrop={handleDrop} imageMaxSize={imageMaxSize} validFormats={validFormats}
                                  multipleUpload={multipleUpload}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    product: getProduct(state),
    isLoading: getIsLoading(state),
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
});

const actionCreators = {
    requestProduct,
    editProduct
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(EditProductContainer);