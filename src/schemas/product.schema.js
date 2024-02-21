import { Schema, model } from "mongoose"

export const productSchema = new Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    oldPrice: { type: Number, required: false },
    tags: [{ type: String, required: false }],
    image: { type: String, required: false },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});

const Product = model('Product', productSchema);

export default Product;