import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authController = new AuthController(); 
const router = express.Router();

router.post('/login', authController.login);

export default router;
