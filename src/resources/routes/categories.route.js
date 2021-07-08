import { Router } from "express";
import CategoryControllers from "../controllers/categories";
const router = Router();

router
  .route("/")
  .post(CategoryControllers.addACategory)
  .get(CategoryControllers.getAllCategories)
  .put(CategoryControllers.updateACategory);

router.route("/:id").delete(CategoryControllers.deleteACategory);

export const categoryRouter = router;
