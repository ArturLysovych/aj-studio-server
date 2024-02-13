import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const productController = new ProductController(); 
const router = new Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);

export default router;