import Product from "../schemas/product.schema.js";

export class ProductService {
    async getProducts() {
        try {
			return await Product.find();
		} catch (error) {
			throw error;
        }
    }

    async createProduct(product) {
        try {
            return await new Product(product).save();
        }
        catch (error) {
			throw error;
        }
    }
}