import { Request, Response } from "express";
import { Service } from "../models/associations";
import { getAllServicesForUser } from "../queries/service.queries";

// Interface pour typer la requête avec les infos JWT
interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export const serviceController = {
  createService: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const senderId = Number(req.body.sender_id); // ID du token
      const { receiver_id, object } = req.body;

      if (!receiver_id || !object) {
        return res.status(400).json({ message: "Champs requis manquants" });
      }

      const newService = await Service.create({
        object,
        status: "pending",
        sender_id: senderId,
        receiver_id,
      });

      res.status(201).json({
        message: "Service proposé avec succès",
        service: newService,
      });
    } catch (error) {
      console.error("Erreur création service :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  getAllForLoggedUser: async (req: AuthenticatedRequest, res: Response) => {
    console.log("→ user dans getAllForLoggedUser :", req.user);

    try {
      const userId = Number(req.user?.id); // On récupère depuis le JWT

      const services = await getAllServicesForUser(userId);

      res.status(200).json({
        success: true,
        message: "Services liés à l'utilisateur récupérés",
        data: services,
      });
    } catch (error) {
      console.error("Erreur dans getAllForLoggedUser :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
};
