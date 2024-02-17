import Product from "../schemas/product.schema.js";

export class ProductService {
    async getProducts() {
        try {
			return await Product.find();
		} catch (error) {
			throw error;
        }
    }
    
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async createProduct(productData, image) {
        try {
            const imagePath = "/" + image.filename;
            
            const tags = JSON.parse(productData.tags);
    
            const product = { ...productData, tags, image: imagePath };
            return await new Product(product).save();
        } catch (error) {
            throw error;
        }
    }
    
}