import { Router } from "express";
import userController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";


const userRouter = Router();
console.log("Je suis dans userrouter");
// Route protégée : profil utilisateur connecté
userRouter.get("/me", verifyToken, userController.getCurrentUser);

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
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

// User - Services
userRouter.get("/:id/services", userController.getUserServices);

// Route en SQL brut avec un affichage plus riche et dépend de getUsersServiceRaw
userRouter.get("/:id/services-raw", verifyToken, userController.getUsersServicesRaw);

// User - Messages
userRouter.get("/:id/messages", userController.getUserMessages);

// User - Reviews
userRouter.get("/:id/reviews", userController.getUserReviews);

export default userRouter;
