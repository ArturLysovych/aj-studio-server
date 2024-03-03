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
            const imagePath = "/" + image.filename || image.name;
            
            const sizes = JSON.parse(productData.sizes);
            const tags = JSON.parse(productData.tags);
            const colors = JSON.parse(productData.colors);

            const product = { ...productData, tags, colors, sizes, image: imagePath };
            return await new Product(product).save();
        } catch (error) {
            throw error;
        }
    }
    
    async editProduct(editedProduct, productId) {
        try {
            const product = await this.getProductById(productId);
            product.oldPrice = product.price;
    
            if (editedProduct.tags) {
                editedProduct.tags = JSON.parse(editedProduct.tags);                
            }
    
            if (editedProduct.colors) {
                editedProduct.colors = JSON.parse(editedProduct.colors);
            }

            if (editedProduct.sizes) {
                editedProduct.sizes = JSON.parse(editedProduct.sizes);
            }
    
            Object.assign(product, editedProduct);
            
            return await product.save();
        } catch (error) {
            throw error;
        }
    }    

    async deleteProduct(productId) {
        try {
            const productToDelete = await Product.findByIdAndDelete(productId);

            if (!productToDelete) {
                throw new Error("Product not found");
            }

            return "Product deleted successfully";
        } catch (error) {
            throw error;
        }
    }
}