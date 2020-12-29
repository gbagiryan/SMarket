import express from 'express';
import productController from '../controllers/productController.js';
import requireAuth from '../middleware/authMiddleware.js';
import {validateAddProduct, validateEditProduct, isValidated} from "../validators/productValidators.js";
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/get_product/:productId', productController.product_get);
router.post('/add_new_product', requireAuth, validateAddProduct, isValidated, productController.product_post);
router.delete('/delete_product/:productId', requireAuth, productController.product_delete);
router.patch('/edit_product', requireAuth, upload.single('productPicture'), validateEditProduct, isValidated, productController.product_patch);
router.post('/get_product_list', productController.request_product_list_post);

export default router;