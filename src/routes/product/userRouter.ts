import { Router } from "express";
import productController from "../../controllers/productController";

const router = Router();

router.post('/create', productController.createProduct);

export default router;