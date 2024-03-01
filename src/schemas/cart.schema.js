import { Schema } from "mongoose"

export const cartSchema = new Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false, default: '' },
    oldPrice: { type: String, required: false, default: '' },
    tags: [{ type: String, required: false }],
    colors: [{ type: String, required: true, default: [] }],
    size: { type: String, required: true },
    image: { type: String, required: false },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});
