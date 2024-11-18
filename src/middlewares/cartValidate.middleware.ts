import { body } from "express-validator";

export const cartAddToCartValidationRules = () => {
  return [
    body("productAttrId").notEmpty().withMessage("productAttrId is required"),
    body("quantity").notEmpty().withMessage("quantity is required"),
    body("quantity").isNumeric().withMessage("quantity must be a number"),
  ];
}

export const deleteItemCartValidationRules = () => {
  return [
    body("productAttrId").notEmpty().withMessage("productAttrId is required"),
  ];
}