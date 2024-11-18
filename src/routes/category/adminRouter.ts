import { Router } from "express";
import { verifyTokenAdmin } from "../../middlewares/verifyToken.middleware";
import { validate } from "../../middlewares/validate.middleware";
import categoryController from "../../controllers/categoryController";
import { categoryCreateValidationRules } from "../../middlewares/categoryValidate.middleware";

const router = Router();

router.post(
  "/create",
  verifyTokenAdmin,
  categoryCreateValidationRules(),
  validate,
  categoryController.createAdmin
);

router.put(
  "/:id",
  verifyTokenAdmin,
  categoryCreateValidationRules(),
  validate,
  categoryController.updateAdmin
);

router.delete("/:id", verifyTokenAdmin, categoryController.deleteAdmin);

router.get("/", verifyTokenAdmin, categoryController.getListAll);

export default router;
