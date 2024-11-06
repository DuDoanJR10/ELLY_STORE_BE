import { Router } from "express";
import userController from "../../controllers/userController";
import {
  userLoginValidationRules,
  userRegisterValidationRules,
  userVerifyEmailValidationRules,
} from "../../middlewares/userValidate.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { verifyTokenUser } from "../../middlewares/verifyToken.middleware";

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
router.get("/me", verifyTokenUser, userController.getMe);

export default router;
