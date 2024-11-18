import { Router } from "express";
import CartController from "../../controllers/cartController";
import { verifyTokenUser } from "../../middlewares/verifyToken.middleware";
import {
  cartAddToCartValidationRules,
  deleteItemCartValidationRules,
} from "../../middlewares/cartValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post(
  "/add-to-cart",
  verifyTokenUser,
  cartAddToCartValidationRules(),
  validate,
  CartController.addToCart
);

router.delete(
  "/remove-item-cart",
  verifyTokenUser,
  deleteItemCartValidationRules(),
  validate,
  CartController.deleteItemCart
);

router.get("/get-cart", verifyTokenUser, CartController.getCart);

export default router;
