import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

// CRUD User
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getOneUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

// User - Services
userRouter.get("/:id/services", userController.getUserServices);

// User - Messages
userRouter.get("/:id/messages", userController.getUserMessages);

export default userRouter;
