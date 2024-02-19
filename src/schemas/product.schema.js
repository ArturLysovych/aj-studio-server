import { Schema, model } from "mongoose"

export const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    tags: [{ type: String, required: false }],
    image: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});

const Product = model('Product', productSchema);

export default Product;