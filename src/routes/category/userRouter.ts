import { Router } from "express";
import categoryController from "../../controllers/categoryController";

const router = Router();

router.get("/get-list-all", categoryController.getListAll);

export default router;