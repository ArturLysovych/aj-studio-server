import { ProductService } from "../services/product.service.js";
const productService = new ProductService();
import upload from "../middlewares/multer.js";

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
		upload.single('image')(req, res, async (err) => {
			try {
				if (err) {
					throw new Error(err.message);
				}
	
				const product = await productService.createProduct(req.body, req.file);
				res.status(201).json(product);
			} catch (error) {
				res.status(500).json({ message: error.message });
			}
		});
	}

	async editProduct(req, res) {
        upload.single('image')(req, res, async (err) => {
            try {
                if (err) {
                    throw new Error(err.message);
                }

                const productId = req.params.productId;
                const editedProduct = req.body;

                const updatedProduct = await productService.editProduct(editedProduct, productId);

                res.status(200).json(updatedProduct);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
	}
	
	async deleteProduct(req, res) {
        try {
            const productId = req.params.productId;
            await productService.deleteProduct(productId);
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}