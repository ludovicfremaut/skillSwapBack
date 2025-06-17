import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validate-auth";
import { moderateProfile } from "../middleware/validation-register";

const authRouter = Router();

authRouter.post("/login", validateAuth, authController.login);
authRouter.post("/logout", authController.logout);

authRouter.post("/register", validateAuth, moderateProfile,authController.register);

export default authRouter;