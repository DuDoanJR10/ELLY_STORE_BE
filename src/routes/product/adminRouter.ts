import { Router } from "express";
import productController from "../../controllers/productController";
import { verifyTokenAdmin } from "../../middlewares/verifyToken.middleware";
import { productCreateValidationRules } from "../../middlewares/productValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { paginationValidationRules } from "../../middlewares/filterValidate.miđleware";

const router = Router();

router.post(
  "/create",
  verifyTokenAdmin,
  productCreateValidationRules(),
  validate,
  productController.createProduct
);

router.put(
  "/update/:id",
  verifyTokenAdmin,
  productCreateValidationRules(),
  validate,
  productController.updateProduct
);

router.delete("/delete/:id", verifyTokenAdmin, productController.deleteProduct);

router.get("/detail/:id", verifyTokenAdmin, productController.findProductDetail);

router.get(
  "/get-list",
  verifyTokenAdmin,
  paginationValidationRules(),
  validate,
  productController.findProduct
);

export default router;
