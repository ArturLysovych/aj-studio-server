import { OrderService } from "../services/order.service.js";
import { NotificationService } from "../services/notification.service.js";
const orderService = new OrderService();
const notificationService = new NotificationService();

export class OrderController {
    async getAllOrders(req, res) {
        try {
            const orders = await orderService.getOrders();
            return res.status(200).json(orders);
        } catch (error) {
			return res.status(500).json({ message: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await orderService.getOrdersById(orderId);
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }    

    async makeOrder(req, res) {
        try {
            const orderData = req.body;
            const order = await orderService.makeOrder(orderData);

            console.log(order);

            const userId = order.user._id;
            const message = `Order created ${new Date(order.createdAt).toLocaleString()}, ${order._id}`;
            const type = 'Order info';

            await notificationService.createNotification(userId, message, type);
            return res.status(200).json(order);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
    }

    async changeOrderStatus(req, res) {
        try {
            const { orderId, newStatus } = req.params;
            const updatedOrder = await orderService.changeOrderStatus(orderId, newStatus);

            const userId = updatedOrder.user._id;
            const message = `Order status changed to ${updatedOrder.status}, ${updatedOrder._id}`;
            const type = 'Order changes';

            await notificationService.createNotification(userId, message, type);
            
            return res.status(200).json(updatedOrder);  

        } catch (error) {
            return res.status(500).json({ message:`Order not found: ${error.message}` });
        }
    }

    async deleteOrder(req, res) {
        try {
            const orderId = req.params.orderId;
            await orderService.deleteOrder(orderId);
            return res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message:`Order not found: ${error.message}` });
        }
    }

    async getPendingOrders(req, res) {
        try {
            const pendingOrders = await orderService.getPendingOrders();
            return res.status(200).json(pendingOrders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getNewOrderCountLastWeek(req, res) {
        try {
            const newOrderCount = await orderService.getNewOrderCountLastWeek();
            return res.json({ newOrderCount });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } 

    async getOrdersForChart(req, res) {
        try {
            const chartInfo = await orderService.getOrdersForChart();
            return res.json({ chartInfo });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } 

    async getOrdersByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const userOrders = await orderService.getOrdersByUserId(userId);
            return res.status(200).json(userOrders);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
