import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { OrderController } from '../controllers/order.controller.js';

const userController = new UserController(); 
const orderController = new OrderController();
const router = express.Router();

router.get("/new-user-count-last-week", userController.getNewUserCountLastWeek);
router.get("/new-order-count-last-week", orderController.getNewOrderCountLastWeek);
router.get("/orders-for-chart", orderController.getOrdersForChart);

export default router;
