import { Router } from "express";
import ImageControllers from "../controllers/images";
const router = Router();

router.route("/").post(ImageControllers.uploadAnImage);
router.route("/:imageid").delete(ImageControllers.deleteAnImage);

export const imageRouter = router;
