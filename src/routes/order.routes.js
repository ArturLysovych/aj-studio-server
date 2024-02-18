import express from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const orderController = new OrderController(); 
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:orderId", orderController.getOrderById);
router.post('/make-order', authMiddleware, orderController.makeOrder);
router.put('/update-status/:orderId/:newStatus', authMiddleware, orderController.changeOrderStatus);
router.delete('/delete-order/:orderId', authMiddleware, orderController.deleteOrder);

export default router;
