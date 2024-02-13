import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

export class ProductController {
    async getProducts(req, res) {
		try {
            const products = await productService.getProducts();
			return res.status(200).json(products);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async getProductById(req, res) {
        try {
            const productId = req.params.productId;
            const product = await productService.getProductById(productId);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

	async createProduct(req, res) {
		try {
			const product = await productService.createProduct(req.body);
			return res.status(201).json(product);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}