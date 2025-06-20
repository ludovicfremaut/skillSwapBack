import { Request, Response } from "express";
import { User } from "../models/associations";
import { Sequelize, QueryTypes } from "sequelize";
import { getAllServicesForUser } from "../queries/service.queries";

interface UserController {
  getAllUsers: (req: Request, res: Response) => Promise<void>;
  getOneUser: (req: Request, res: Response) => Promise<void>;
  deleteUser: (req: Request, res: Response) => Promise<void>;
  updateUser: (req: Request, res: Response) => Promise<void>;
  getUserServices: (req: Request, res: Response) => Promise<void>;
  getUserMessages: (req: Request, res: Response) => Promise<void>;
  getUserReviews: (req: Request, res: Response) => Promise<void>;
  getSixRandomUsers: (req: Request, res: Response) => Promise<void>;
  getSixLatestUsers: (req: Request, res: Response) => Promise<void>;
  getTenUsers: (req: Request, res: Response) => Promise<void>;
  getUsersBySkillAndZipcode: (req: Request, res: Response) => Promise<void>;
  getUsersServicesRaw: (req: Request, res: Response) => Promise<void>;
  getCurrentUser: (req: Request, res: Response) => Promise<void>;
}

const userController: UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        include: [
          {
            association: "skills",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      if (!users || users.length === 0) {
        res.status(404).json({
          success: false,
          message: "Aucun user",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("error in getAllUsers : ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getOneUser: async (req: Request, res: Response) => {
    try {
      // Use where with findOne to check by id
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password", "street"] },
        include: [
          {
            association: "skills",
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            association: "providedServices",
            attributes: ["id", "object", "status", "receiver_id", "date"],
          },
          {
            association: "requestedServices",
            attributes: ["id", "object", "status", "sender_id", "date"],
          },
          {
            association: "postedReviews",
            attributes: ["rating", "comment"],
          },
          {
            association: "role",
            attributes: ["name"],
          },
          {
            association: "sentMessages",
            attributes: ["body"],
          },
          {
            association: "receivedMessages",
            attributes: ["body"],
          },
        ],
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("error in getOneUser: ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
        return;
      }
      await user.destroy();

      res.status(200).json({
        success: true,
        message: "Uilisateur supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur dans le deleteUser: ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
        return;
      }

      const updateData = req.body;

      await user.update(updateData);

      res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: user,
      });
    } catch (error) {
      console.error("Erreur dans updateUser:", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getUserServices: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            association: "providedServices",
            attributes: ["object", "status"],
          },
        ],
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Services de l'utilisateur trouvés avec succès",
        data: user,
      });
      return;
    } catch (error) {
      console.error(
        "Erreur dans la recherche de services de l'utilisateur : ",
        error,
      );
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  // Dépend de cette route userRouter.get("/:id/services-raw", userController.getUsersServicesRaw);
  getUsersServicesRaw: async (req: Request, res: Response) => {
    const userId = Number(req.params.id);

    try {
      const services = await getAllServicesForUser(userId);

      // console.log("→ Résultat de getAllServicesForUser : ", services);
      res.status(200).json({
        success: true,
        message: "Services récupérés (requête factorisée)",
        data: services,
      });
    } catch (error) {
      console.error("Erreur dans getUsersServicesRaw :", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },

  getUserMessages: async (req: Request, res: Response) => {
    try {
      const userMessages = await User.findByPk(req.params.id, {
        include: [
          {
            association: "sentMessages",
            attributes: ["body", "sending_date", "updated_at"],
          },
          {
            association: "receivedMessages",
            attributes: ["body", "sending_date", "updated_at"],
          },
        ],
      });

      if (!userMessages) {
        res.status(404).json({
          success: false,
          message: "Aucun message trouvé",
        });
      }

      res.status(200).json({
        success: true,
        message: "Services de l'utlisateur trouvés avec succès",
        data: userMessages,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche de messages de l'utilisateur : ",
        error,
      );
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getUserReviews: async (req: Request, res: Response) => {
    try {
      const userReviews = await User.findByPk(req.params.id, {
        include: [
          {
            association: "postedReviews",
            attributes: ["rating", "comment"],
          },
        ],
      });
      if (!userReviews) {
        res.status(404).json({
          success: false,
          message: "Aucun avis trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Avis de l'utlisateur trouvés avec succès",
        data: userReviews,
      });
      return;
    } catch (error) {
      console.error(
        "Erreur dans la recherche d'avis de l'utilisateur : ",
        error,
      );
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getSixRandomUsers: async (req: Request, res: Response) => {
    try {
      const sixRandomUsers = await User.findAll({
        order: Sequelize.literal("RANDOM()"),
        limit: 6,
        attributes: [
          "id",
          "firstname",
          "lastname",
          "city",
          "description",
          "availability",
          "profile_picture",
        ],
        include: [
          {
            association: "skills",
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      if (!sixRandomUsers) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Sx utilisateurs random trouvés",
        data: sixRandomUsers,
      });
      return;
    } catch (error) {
      console.error("Erreur dans la recherche d'utilisateurs random : ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  getSixLatestUsers: async (req: Request, res: Response) => {
    try {
      const sixLatestUsers = await User.findAll({
        order: [["id", "DESC"]],
        limit: 6,
        attributes: ["id", "firstname", "lastname", "profile_picture"],
      });

      if (!sixLatestUsers) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Six derniers utilisateurs trouvés",
        data: sixLatestUsers,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche des 6 derniers utilisateurs : ",
        error,
      );
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getTenUsers: async (req: Request, res: Response) => {
    try {
      const limit = Math.min(Number(req.query.limit) || 10, 50);
      const offset = Number(req.query.offset) || 0;

      const { rows: users, count: total } = await User.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "firstname", "lastname", "profile_picture"],
      });

      if (!users || users.length === 0) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur",
        });
      }

      res.status(200).json({
        success: true,
        data: {
          users,
          pagination: {
            total,
            currentPage: Math.floor(offset / limit) + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            offset,
          },
        },
      });
      return;
    } catch (error) {
      console.error("Erreur dans la sélection de 10 utilisateurs : ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getUsersBySkillAndZipcode: async (req: Request, res: Response) => {
    try {
      const { skillName, zipcode } = req.query;

      if (!skillName || !zipcode) {
        res.status(400).json({
          success: false,
          message: "La compétence et le code postal sont requis.",
        });
        return;
      }

      const users = await User.findAll({
        where: { zipcode },
        include: [
          {
            association: "skills",
            where: { name: skillName },
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
        attributes: ["firstname", "lastname", "profile_picture"],
      });

      if (!users) {
        res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé dans votre filtre de recherche",
        });
        return;
      }
      res.status(200).json({
        success: true,
        data: users,
      });
      return;
    } catch (error) {
      console.error("Erreur dans la recherche : ", error);
      res.status(500).json({
        success: false,
        message: "internal server error",
      });
      return;
    }
  },

  getCurrentUser: async (req: Request, res: Response) => {
    try {
      // Typage facultatif si on n'a pas encore l'interface AuthenticatedRequest
      const userId = (req as any).user?.id;

      if (!userId) {
        res.status(401).json({ message: "Non authentifié" });
        return;
      }

      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
        include: [
          {
            association: "skills",
            attributes: ["name"],
            through: { attributes: [] },
          },
          {
            association: "providedServices",
            attributes: ["id", "object", "status", "receiver_id", "date"],
          },
          {
            association: "requestedServices",
            attributes: ["id", "object", "status", "sender_id", "date"],
          },
        ],
      });

      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Erreur dans getCurrentUser :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};

export default userController;
