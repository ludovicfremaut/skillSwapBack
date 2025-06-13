import { Router } from "express";
import userController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

const userRouter = Router();

// Get 6 random users
userRouter.get("/random", userController.getSixRandomUsers);

// Get 6 lastest users
userRouter.get("/latest", userController.getSixLatestUsers);

// Get users 10 by 10
userRouter.get("/limit", userController.getTenUsers);

// Search user by skill and zipcode
userRouter.get("/search", userController.getUsersBySkillAndZipcode);

// CRUD User
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getOneUser);
userRouter.put("/:id", verifyToken, userController.updateUser);
userRouter.delete("/:id", verifyToken, userController.deleteUser);

// User - Services
userRouter.get("/:id/services", verifyToken, userController.getUserServices);

// User - Messages
userRouter.get("/:id/messages", verifyToken, userController.getUserMessages);

// User - Reviews
userRouter.get("/:id/reviews", userController.getUserReviews);

export default userRouter;
