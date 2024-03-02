import Notification from "../schemas/notification.schema.js";

export class NotificationService {
    async createNotification(userId, message, type) {
        try {
            const notification = new Notification({ userId, message, type });
            return await notification.save();
        } catch (error) {
            throw error;
        }
    }

    async markNotificationAsRead(notificationId) {
        try {
            const notification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
            return notification;
        } catch (error) {
            throw error;
        }
    }

    async getNotificationsByUserId(userId) {
        try {
            return await Notification.find({ userId });
        } catch (error) {
            throw error;
        }
    }
}
