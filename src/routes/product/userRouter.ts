import { Router } from "express";
import productController from "../../controllers/productController";
import { paginationValidationRules } from "../../middlewares/filterValidate.miđleware";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.get('/get-list', paginationValidationRules(), validate, productController.findProduct);

router.get('/detail/:id', productController.findProductDetail);

export default router;