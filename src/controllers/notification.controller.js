import { NotificationService } from "../services/notification.service.js";

const notificationService = new NotificationService();

export class NotificationController {
    async createNotification(req, res) {
        try {
            const { userId } = req.params;
            const { message, type } = req.body;
            const notification = await notificationService.createNotification(userId, message, type);
            return res.status(201).json(notification);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }       

    async markNotificationAsRead(req, res) {
        try {
            const notificationId = req.params.notificationId;
            const notification = await notificationService.markNotificationAsRead(notificationId);
            return res.status(200).json(notification);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getNotificationsByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const notifications = await notificationService.getNotificationsByUserId(userId);
            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
