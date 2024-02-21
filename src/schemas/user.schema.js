import { Schema, model } from "mongoose"
import { productSchema } from "./product.schema.js";

export const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    likes: [productSchema],
    createdAt: { type: Date, default: () => new Date().toISOString() },
    role: {
        type: String,
        default: 'USER'
    }
});

const User = model('User', userSchema);

export default User;