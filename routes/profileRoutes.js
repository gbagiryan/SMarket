import express from 'express';
import profileController from '../controllers/profileController.js';

const router = express.Router();

router.get('/get_profile/:userId', profileController.profile_get);

export default router;