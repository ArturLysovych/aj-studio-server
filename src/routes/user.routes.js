import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userController = new UserController();
const router = new Router();

router.get("/", userController.getUsers);
router.get("/:userId", userController.getUserById);
router.post("/", userController.createUser);

export default router;