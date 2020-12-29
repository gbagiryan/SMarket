import React, {useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOCs/withAuthRedirect";
import {EditProductReduxForm} from "./EditProductForm";
import {getProduct} from "../../redux/selectors/productSelectors";
import {requestProduct} from "../../redux/reducers/ProductReducer";
import {editProduct} from "../../redux/reducers/AuthReducer";

const EditProductContainer = (props) => {

    useEffect(() => {
        let productId = props.match.params.productId;
        if (productId) {
            props.requestProduct(productId);
        }
    }, [props.match.params]);


    const [productPictures, setProductPictures] = useState('')

    const handleAddedPhoto = (event) => {
        if (event.target.files.length) {
            setProductPictures(event.target.files[0])
        }
    }

    const handleEdit = (form) => {
        const formData = new FormData();
        formData.append('productId', form.productId);
        formData.append('productName', form.productName);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('category', form.category);
        formData.append('productPictures', productPictures);

        props.editProduct(formData);
    }
    return (
        <div>
            <EditProductReduxForm product={props.product} onSubmit={handleEdit} handleAddedPhoto={handleAddedPhoto}/>
        </div>
    )
};

const mapStateToProps = (state) => ({
    product: getProduct(state),
});

const actionCreators = {
    requestProduct,
    editProduct
};

export default compose(
    connect(mapStateToProps, actionCreators),
    withAuthRedirect
)(EditProductContainer);