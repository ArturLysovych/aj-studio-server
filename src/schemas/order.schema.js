import { Schema, model } from "mongoose"
import { userSchema } from "./user.schema.js";
import { cartSchema } from "./cart.schema.js";

const orderSchema = new Schema({
    user: userSchema,
    cart: [cartSchema],
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});

const Order = model('Order', orderSchema);

export default Order;