import { Schema, model } from "mongoose"
import { productSchema } from "./product.schema.js";
import { userSchema } from "./user.schema.js";

const orderSchema = new Schema({
    user: userSchema,
    cart: [productSchema],
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});

const Order = model('Order', orderSchema);

export default Order;