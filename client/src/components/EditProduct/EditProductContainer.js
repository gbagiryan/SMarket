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

    useEffect(() => {
        let productId = props.match.params.productId;
        if (productId) {
            props.requestProduct(productId);
        }
    }, [props.match.params]);

    const [productPicture, setProductPicture] = useState('')

    const validateImg = (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            if (currentFile.size > imageMaxSize) {
                alert(`Image max size is ${imageMaxSize}`);
                return false
            }
            if (!validFormats.includes(currentFile.type)) {
                alert(`${currentFile.name} is not an image`);
                return false
            }
            return true;
        }
    }

    const handleDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            validateImg(rejectedFiles);
        }
        if (files && files.length > 0) {
            const isValid = validateImg(files);
            if (isValid) {
                setProductPicture(files[0])
            }
        }
    }

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('productId', props.product._id);
        formData.append('productName', form.productName);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('productPicture', productPicture);

        props.editProduct(formData);
    }
    return (
        <div>
            <EditProductReduxForm product={props.product} onSubmit={handleEdit} isLoading={props.isLoading}
                                  errorMsg={props.errorMsg} successMsg={props.successMsg}
                                  handleDrop={handleDrop} imageMaxSize={imageMaxSize}/>
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