import { ProductController } from "../controllers/product.controller.js";
import { Router } from "express";

const productController = new ProductController(); 
const router = new Router();

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);

export default router;