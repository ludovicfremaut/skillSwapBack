import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { verifyToken } from "../middleware/auth.middleware";

const serviceRouter = Router();

serviceRouter.post("/", verifyToken, serviceController.createService);

serviceRouter.post("/:id/status", verifyToken, serviceController.updateStatus);

serviceRouter.get("/me", verifyToken, serviceController.getAllForLoggedUser);

export default serviceRouter;
