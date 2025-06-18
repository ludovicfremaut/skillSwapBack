import { Router } from "express";
import { serviceController } from "../controllers/service.controller";
import { verifyToken } from "../middleware/auth.middleware";

const serviceRouter = Router();

// Créer un nouveau service (user connecté obligatoire)
serviceRouter.post("/", verifyToken, serviceController.createService);

// Mettre à jour le statut d’un service (par le receveur uniquement)
serviceRouter.post("/:id/status", verifyToken, serviceController.updateStatus);

// Voir les services liés à l’utilisateur connecté
serviceRouter.get("/me", verifyToken, serviceController.getAllForLoggedUser);

// Voir les services publics d’un utilisateur (pas besoin d’être connecté)
serviceRouter.get("/user/:id", serviceController.getAllForLoggedUser);

export default serviceRouter;
