import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { OrderController } from '../controllers/order.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const userController = new UserController(); 
const orderController = new OrderController();
const router = express.Router();

router.get("/is-admin", adminMiddleware, (req, res) => {
    res.status(200).json({ message: 'You are an admin' });
});
router.get("/new-user-count-last-week", userController.getNewUserCountLastWeek);
router.get("/new-order-count-last-week", orderController.getNewOrderCountLastWeek);
router.get("/orders-for-chart", orderController.getOrdersForChart);

export default router;
