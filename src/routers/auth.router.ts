import { Router } from "express";
import authController from "../controllers/auth.controller";
import { validateAuth } from "../middleware/validate-auth";


const authRouter = Router();

authRouter.post("/login", validateAuth, authController.login);
authRouter.post("/register", validateAuth, authController.register);

export default authRouter;