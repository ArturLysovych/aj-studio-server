import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userController = new UserController();
const router = new Router();

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUserById);
router.get("/likes/:userId", userController.getLikesByUserId);
router.post("/:userId/like/:productId", userController.toggleLike);
router.post("/:userId/view/:productId", userController.addToViewed);
router.get("/viewed/:userId", userController.getViewedProductsByUserId);

export default router;