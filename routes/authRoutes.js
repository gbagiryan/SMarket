import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/verifyAuth', authController.isUserAuthed);
router.get('/logout', authController.logout_get);
router.post('/login', authController.login_post);
router.post('/register', authController.register_post);

export default router;