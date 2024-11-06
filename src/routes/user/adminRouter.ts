import { Router } from "express";
import userController from "../../controllers/userController";
import {
  userLoginValidationRules,
} from "../../middlewares/userValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();
router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  userController.adminLogin
);

export default router;
