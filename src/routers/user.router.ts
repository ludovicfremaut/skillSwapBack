import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

// Get 6 random users
userRouter.get("/random", userController.getSixRandomUsers);

// Get 6 lastest users
userRouter.get("/latest", userController.getSixLatestUsers);

// Get users 10 by 10
userRouter.get("/limit", userController.getTenUsers);

// CRUD User
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getOneUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

// User - Services
userRouter.get("/:id/services", userController.getUserServices);

// User - Messages
userRouter.get("/:id/messages", userController.getUserMessages);

// User - Reviews
userRouter.get("/:id/reviews", userController.getUserReviews);

export default userRouter;
