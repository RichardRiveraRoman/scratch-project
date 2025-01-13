import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', userController.getUserProfile);
router.put('/me', userController.updateUserProfile);


export default router;
