import Order from "../schemas/order.schema.js";
import moment from 'moment';

export class OrderService {
    async getOrders() {
        try {
			return await Order.find();
		} catch (error) {
			throw error;
        }
    }
    
    async getOrdersById(id) {
        try {
            return await Order.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async makeOrder(orderInfo) {
        try {
            const order = new Order(orderInfo);
            return order.save();
        } catch (error) {
            throw error;
        }
    }

    async changeOrderStatus(orderId, newStatus) {
        try {
            const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
            return order;
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            const deleteOrder = await Order.findByIdAndDelete(orderId);
            return deleteOrder;
        } catch (error) {
            throw error;
        }
    }

    async getPendingOrders() {
        try {
            const pendingOrders = await Order.find({ status: "pending" });
            return pendingOrders;
        } catch (error) {
            throw error;
        }
    }

    async getNewOrderCountLastWeek() {
        try {
            const today = moment();
            const startOfThisWeek = today.clone().subtract('week').startOf('isoWeek').toDate();
            const endOfLastWeek = today.clone().subtract('week').endOf('isoWeek').toDate();

            const newOrderCount = await Order.countDocuments({
                createdAt: {
                    $gte: startOfThisWeek,
                    $lte: endOfLastWeek
                }
            });
    
            return { newOrderCount, totalOrders: await Order.countDocuments() };
        } catch (error) {
            throw error;
        }
    }

    async getOrdersForChart() {
        try {
            const today = moment();
            const firstStart = today.clone().subtract(3, 'week').startOf('isoWeek').toDate();
            const firstEnd = today.clone().subtract(3, 'week').endOf('isoWeek').toDate();

            const secondStart = today.clone().subtract(2, 'week').startOf('isoWeek').toDate();
            const secondEnd = today.clone().subtract(2, 'week').endOf('isoWeek').toDate();

            const thirdStart = today.clone().subtract(1, 'week').startOf('isoWeek').toDate();
            const thirdEnd = today.clone().subtract(1, 'week').endOf('isoWeek').toDate();

            const fourthStart = today.clone().subtract('week').startOf('isoWeek').toDate();
            const fourthEnd = today.clone().subtract('week').endOf('isoWeek').toDate();

            const firstCount = await Order.countDocuments({
                createdAt: {
                    $gte: firstStart,
                    $lte: firstEnd
                }
            });

            const secondCount = await Order.countDocuments({
                createdAt: {
                    $gte: secondStart,
                    $lte: secondEnd
                }
            });
            
            const thirdCount = await Order.countDocuments({
                createdAt: {
                    $gte: thirdStart,
                    $lte: thirdEnd
                }
            });
            
            const fourthCount = await Order.countDocuments({
                createdAt: {
                    $gte: fourthStart,
                    $lte: fourthEnd
                }
            });
    
            return {
                firstWeek: { count: firstCount, date: firstStart.toLocaleDateString() },
                secondWeek: { count: secondCount, date: secondStart.toLocaleDateString() },
                thirdWeek: { count: thirdCount, date: thirdStart.toLocaleDateString() },
                fourthWeek: { count: fourthCount, date: fourthStart.toLocaleDateString() }
            };
        } catch (error) {
            throw error;
        }
    }
}