import express from 'express';
import { ProductController } from "../controllers/product.controller.js";

const productController = new ProductController(); 
const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:productId', productController.editProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;
