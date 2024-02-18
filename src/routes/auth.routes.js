import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authController = new AuthController(); 
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
