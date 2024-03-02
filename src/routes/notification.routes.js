import express from 'express';
import { NotificationController } from '../controllers/notification.controller.js';

const notificationController = new NotificationController();
const router = express.Router();

router.post("/create/:userId", notificationController.createNotification);
router.put('/:notificationId/read', notificationController.markNotificationAsRead);
router.get('/user/:userId', notificationController.getNotificationsByUserId);

export default router;
