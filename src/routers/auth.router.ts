import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validate-auth";
import { verifyToken } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", validateAuth, verifyToken, authController.login);
authRouter.post("/register", validateAuth, authController.register);

export default authRouter;