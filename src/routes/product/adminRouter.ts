import { Router } from "express";
import productController from "../../controllers/productController";
import { verifyTokenAdmin } from "../../middlewares/verifyToken.middleware";
import { productCreateValidationRules } from "../../middlewares/productValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post(
  "/create",
  verifyTokenAdmin,
  productCreateValidationRules(),
  validate,
  productController.createProduct
);

router.get("/", verifyTokenAdmin, productController.findProduct);

export default router;
