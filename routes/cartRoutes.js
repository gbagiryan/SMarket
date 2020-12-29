import express from "express";
import requireAuth from '../middleware/authMiddleware.js';
import cartController from "../controllers/cartController.js";
const router = express.Router();

router.post('/add_to_cart', requireAuth, cartController.cart_post);
router.delete('/delete_from_cart/:productId', requireAuth, cartController.cart_delete);

export default router;