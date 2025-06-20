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
      const senderId = Number(req.user?.id); // ID du token
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
    // console.log("→ user dans getAllForLoggedUser :", req.user);

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
  },

  updateStatus: async (req: Request, res: Response) => {
    try {
      const serviceId = Number(req.params.id);
      const { newStatus } = req.body;

      const userId = Number((req as any).user?.id);

      const allowed = ["pending", "accepted", "done"];
      if (!allowed.includes(newStatus)) {
        return res.status(400).json({ message: "Statut non reconnu" });
      }

      const service = (await Service.findByPk(serviceId)) as any;
      if (!service) {
        return res.status(404).json({ message: "Service introuvable" });
      }

      const receiverId = Number(service.receiver_id);

      if (userId !== receiverId) {
        return res
          .status(403)
          .json({ message: "Non autorisé à modifier ce service" });
      }

      if (
        (newStatus === "accepted" && service.status !== "pending") ||
        (newStatus === "done" && service.status !== "accepted")
      ) {
        return res
          .status(400)
          .json({ message: "Transition de statut invalide" });
      }

      // Correspondance front/backend ↔ PostgreSQL
      const dbStatusMap: Record<string, string> = {
        pending: "pending",
        accepted: "accepted",
        done: "completed",
      };

      service.status = dbStatusMap[newStatus];

      await service.save();

      return res.status(200).json({
        message: "Statut mis à jour",
        status: newStatus, // on renvoie celui du front pour cohérence
      });
    } catch (error) {
      console.error("Erreur updateStatus :", error);
      return res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
