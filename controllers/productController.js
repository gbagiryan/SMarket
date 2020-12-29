import Product from "../models/Product.js";
import mongoose from 'mongoose';
import User from "../models/User.js";

const add_product_post = async (req, res) => {
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

const product_list_post = async (req, res) => {
    try {
        const skip = req.body.skip;
        const limit = req.body.limit ? req.body.limit : 10;

        const productsCount = await Product.countDocuments();
        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .populate('user', 'username profileId');

        res.status(200).json({products, productsCount});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }

}
const single_products_get = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        const product = await Product.findById(productId)
            .populate('user', 'username profileId');

        if (!product) {
            return res.status(400).json({errorMessage: "product not found"});
        }

        res.status(200).json({product});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
}

const delete_product_post = async (req, res) => {
    try {
        const {productId} = req.body;
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

        const updatedUser = await req.user.save();
        await updatedUser.populate([
            {
                path: 'products',
                populate: {
                    path: 'user',
                    select: 'username profileId',
                }
            },
        ]).execPopulate();

        res.status(200).json({successMessage: 'Product added', products: updatedUser.products});
    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

const editProduct_patch = async (req, res) => {
    try {
        const {productName, description, price, category, productId} = req.body;
        const files = req.files;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({errorMessage: 'not a valid product id'});
        }
        let productPictures = [];
        if (files.length > 0) {
            productPictures = files.map(file => {
                return {img: '/public/' + file.filename}
            })
        }

        const productToEdit = await Product.findById(productId);

        if (!productToEdit) {
            return res.status(400).json({errorMessage: "product not found"});
        }
        if (JSON.stringify(productToEdit.user) !== JSON.stringify(req.user._id)) {
            return res.status(400).json({errorMessage: "unauthorized"});
        }

        await Product.findOneAndUpdate({_id: productId}, {
            productName,
            description,
            price,
            category,
            productPictures
        }, {new: true})

        const updatedUser = await User.findById(req.user._id);
        await updatedUser.populate([
            {
                path: 'products',
                populate: {
                    path: 'user',
                    select: 'username profileId',
                }
            },
        ]).execPopulate();

        res.status(200).json({successMessage: 'Product added', products: updatedUser.products});

    } catch (err) {
        res.status(500).json({errorMessage: "Server Error"});
    }
};

export default {
    add_product_post,
    delete_product_post,
    product_list_post,
    single_products_get,
    editProduct_patch
};