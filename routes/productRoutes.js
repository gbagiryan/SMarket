import express from 'express';
import productController from '../controllers/productController.js';
import requireAuth from '../middleware/authMiddleware.js';
import {validateAddProduct, validateEditProduct, isValidated} from "../validators/productValidators.js";
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.post('/add_new_product', requireAuth, validateAddProduct, isValidated, productController.add_product_post);
router.post('/delete_product', requireAuth, productController.delete_product_post);
router.patch('/edit_product', requireAuth, upload.array('productPictures'), validateEditProduct, isValidated, productController.editProduct_patch);
router.post('/get_product_list', productController.product_list_post);
router.get('/get_product/:productId', productController.single_products_get);

export default router;