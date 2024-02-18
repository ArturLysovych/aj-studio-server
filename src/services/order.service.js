import Order from "../schemas/order.schema.js";

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
}