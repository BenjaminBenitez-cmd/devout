import { Router } from "express";
import AuthControllers from "../controllers/authorization";
import CategoryControllers from "../controllers/categories";
const router = Router();

router
  .route("/")
  .post(AuthControllers.protectAdmin, CategoryControllers.addACategory)
  .get(CategoryControllers.getAllCategories)
  .put(AuthControllers.protectAdmin, CategoryControllers.updateACategory);

router.route("/:id").delete(CategoryControllers.deleteACategory);

export const categoryRouter = router;
