import Product from "../models/Product.js";
import mongoose from "mongoose";

const cart_delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        req.user.cart = req.user.cart.filter(prod => JSON.stringify(prod) !== JSON.stringify(productId));

        await req.user.save();

        res.status(200).json({successMessage: 'Product deleted from cart', deletedProductId: productId});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

const cart_post = async (req, res) => {
    try {
        const {productId} = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        const productToAdd = await Product.findById(productId);

        if (!productToAdd) {
            return res.status(400).json({errorMessage: "product not found"});
        }

        req.user.cart.push(productToAdd);

        await req.user.save();

        res.status(200).json({successMessage: 'Product added to cart', addedProduct: productToAdd});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

export default {
    cart_post,
    cart_delete
};