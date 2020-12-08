import Product from "../models/Product.js";

const add_product_post = async (req, res) => {
    try {
        const {productName, description, price, category} = req.body;
        const product = new Product({
            productName,
            description,
            price,
            category,
            userId: req.user._id,
        });

        await product.save();

        req.user.items.push(product);
        await req.user.save();

        res.status(200).json({message: "listing added"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const product_list_post = async (req, res) => {
    try {
        const skip = req.body.skip;
        const limit = req.body.limit ? req.body.limit : 10;

        const products = await Product.find()
            .skip(skip)
            .limit(limit);

        res.json(products);
    } catch (err) {
        res.status(500).json(err.message);
    }

}
const single_products_get = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({message: "product not found"});
        }

        res.status(200).json({
            productName: product.productName,
            description: product.description,
            price: product.price,
            category: product.category,
            userId: product.userId
        });

    } catch (err) {
        res.status(500).json(err.message);
    }
}

const delete_product_post = async (req, res) => {
    try {
        const {productId} = req.body;
        const productToDelete = await Product.findById(productId);

        if (!productToDelete) {
            return res.status(400).json({message: "product not found"});
        }

        if (JSON.stringify(productToDelete.userId) !== JSON.stringify(req.user._id)) {
            return res.status(401).json({message: "unauthorized"});
        }

        await productToDelete.remove();

        req.user.items = req.user.items.filter(prod => JSON.stringify(prod) !== JSON.stringify(productId));

        await req.user.save();

        res.status(200).json({message: "listing deleted"});
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export default {
    add_product_post,
    delete_product_post,
    product_list_post,
    single_products_get
};