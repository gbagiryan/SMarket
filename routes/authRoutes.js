import express from 'express';
import authController from '../controllers/authController.js';
import {isValidated, validateRegister, validateLogin, validateEditProfile} from "../validators/authValidators.js";
import requireAuth from "../middleware/authMiddleware.js";
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/verifyAuth', authController.isUserAuthed);
router.get('/logout', authController.logout_get);
router.post('/login', validateLogin, isValidated, authController.login_post);
router.post('/register', validateRegister, isValidated, authController.register_post);
router.patch('/edit_profile', requireAuth, upload.single('profilePicture'), validateEditProfile, isValidated, authController.editProfile_patch);

export default router;