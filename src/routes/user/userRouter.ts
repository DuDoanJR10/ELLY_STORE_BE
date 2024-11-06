import { Router } from "express";
import userController from "../../controllers/userController";
import {
  userLoginValidationRules,
  userRegisterValidationRules,
  userVerifyEmailValidationRules,
} from "../../middlewares/userValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post(
  "/register",
  userRegisterValidationRules(),
  validate,
  userController.register
);
router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  userController.login
);
router.post(
  "/verify-email",
  userVerifyEmailValidationRules(),
  validate,
  userController.verifyEmail
);

export default router;
