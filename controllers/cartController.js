import Product from "../models/Product.js";
import mongoose from "mongoose";

const add_to_cart_post = async (req, res) => {
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

const delete_from_cart_post = async (req, res) => {
    try {
        const {productId} = req.body;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        req.user.cart = req.user.cart.filter(prod => JSON.stringify(prod) !== JSON.stringify(productId));

        const updatedUser = await req.user.save();
        await updatedUser.populate([
            {
                path: 'cart'
            },
        ]).execPopulate();

        res.status(200).json({successMessage: 'Product added to cart', cart: updatedUser.cart});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

export default {
    add_to_cart_post,
    delete_from_cart_post
};