import express from "express";
import requireAuth from '../middleware/authMiddleware.js';
import cartController from "../controllers/cartController.js";
const router = express.Router();

router.post('/add_to_cart', requireAuth, cartController.add_to_cart_post);
router.post('/delete_from_cart', requireAuth, cartController.delete_from_cart_post);

export default router;