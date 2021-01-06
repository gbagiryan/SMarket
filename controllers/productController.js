import Product from "../models/Product.js";
import mongoose from 'mongoose';
import fs from 'fs';

const product_post = async (req, res) => {
    try {
        const {productName, description, price, category} = req.body;
        const product = new Product({
            productName,
            description,
            price,
            category,
            user: req.user._id,
        });

        await product.save();

        req.user.products.push(product);

        await req.user.save();

        res.status(200).json({successMessage: 'Product added', addedProduct: product});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const request_product_list_post = async (req, res) => {
    try {
        const skip = req.body.skip;
        const limit = req.body.limit ? req.body.limit : 10;

        const productsCount = await Product.countDocuments();
        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate('user', 'username');

        res.status(200).json({products, productsCount});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }

}
const product_get = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        const product = await Product.findById(productId)
            .populate('user', 'username');

        if (!product) {
            return res.status(400).json({errorMessage: "product not found"});
        }

        res.status(200).json({product});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

const product_delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        const productToDelete = await Product.findById(productId);

        if (!productToDelete) {
            return res.status(400).json({errorMessage: "product not found"});
        }

        if (JSON.stringify(productToDelete.user) !== JSON.stringify(req.user._id)) {
            return res.status(400).json({errorMessage: "unauthorized"});
        }

        await productToDelete.remove();

        req.user.products = req.user.products.filter(prod => JSON.stringify(prod) !== JSON.stringify(productId));

        await req.user.save();

        if (productToDelete.productPicture) {
            fs.unlink(`uploads/${productToDelete.productPicture}`, (err) => {
                if (err) throw err;
                console.log(`Image ${productToDelete.productPicture} was deleted`)
            })
        }

        res.status(200).json({successMessage: 'Product added', deletedProductId: productToDelete._id});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const product_patch = async (req, res) => {
    try {
        const {productName, description, price, category, productId} = req.body;
        const file = req.file;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }

        const productToEdit = await Product.findById(productId);

        if (!productToEdit) {
            return res.status(400).json({errorMessage: "product not found"});
        }
        if (JSON.stringify(productToEdit.user) !== JSON.stringify(req.user._id)) {
            return res.status(400).json({errorMessage: "unauthorized"});
        }

        const updatedProduct = await Product.findOneAndUpdate({_id: productId}, {
            productName,
            description,
            price,
            category,
            productPicture: file ? '/public/' + file.filename : null
        }, {new: true})

        res.status(200).json({successMessage: 'Product edited', updatedProduct});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

export default {
    product_post,
    product_delete,
    request_product_list_post,
    product_get,
    product_patch
};