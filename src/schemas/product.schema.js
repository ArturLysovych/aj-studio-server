import { Schema, model } from "mongoose"

export const productSchema = new Schema({
    name: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false, default: '' },
    oldPrice: { type: String, required: false, default: '' },
    tags: [{ type: String, required: false }],
    colors: [{ type: String, required: true, default: [] }],
    sizes: [{ type: String, required: true, default: [] }],
    image: { type: String, required: false },
    createdAt: { type: Date, default: () => new Date().toISOString() }
});

const Product = model('Product', productSchema);

export default Product;