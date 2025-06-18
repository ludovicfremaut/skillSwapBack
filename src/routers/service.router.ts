import { Router } from "express";
import { serviceController } from "../controllers/service.controller";

const serviceRouter = Router();


serviceRouter.post("/", serviceController.createService);

// Je dois la faire évoluer avec le JWT
serviceRouter.get("/me", serviceController.getAllForLoggedUser);

serviceRouter.get("/user/:id", serviceController.getAllForLoggedUser);

export default serviceRouter;
