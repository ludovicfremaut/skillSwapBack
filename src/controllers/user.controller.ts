import { Request, Response } from "express";
import { User } from "../models/associations";
import { Sequelize } from "sequelize";

interface UserController {
  getAllUsers: (req: Request, res: Response) => Promise<Response>;
  getOneUser: (req: Request, res: Response) => Promise<Response>;
  deleteUser: (req: Request, res: Response) => Promise<Response>;
  updateUser: (req: Request, res: Response) => Promise<Response>;
  getUserServices: (req: Request, res: Response) => Promise<Response>;
  getUserMessages: (req: Request, res: Response) => Promise<Response>;
  getUserReviews: (req: Request, res: Response) => Promise<Response>;
  getSixRandomUsers: (req: Request, res: Response) => Promise<Response>;
  getSixLatestUsers: (req: Request, res: Response) => Promise<Response>;
  getTenUsers: (req: Request, res: Response) => Promise<Response>;
  getUsersBySkillAndZipcode: (req: Request, res: Response) => Promise<Response>;
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
        return res.status(404).json({
          success: false,
          message: "Aucun user",
        });
      }

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("error in getAllUsers : ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
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
            attributes: ["object", "status"],
          },
          {
            association: "requestedServices",
            attributes: ["object", "status"],
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
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error("error in getOneUser: ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
      }
      await user.destroy();

      return res.status(200).json({
        success: true,
        message: "Uilisateur supprimé avec succès",
      });
    } catch (error) {
      console.error("Erreur dans le deleteUser: ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      const updateData = req.body;

      await user.update(updateData);

      return res.status(200).json({
        success: true,
        message: "Utilisateur mis à jour avec succès",
        data: user,
      });
    } catch (error) {
      console.error("Erreur dans updateUser:", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
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
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Services de l'utilisateur trouvés avec succès",
        data: user,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche de services de l'utilisateur : ",
        error,
      );
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
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
        return res.status(404).json({
          success: false,
          message: "Aucun message trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Services de l'utlisateur trouvés avec succès",
        data: userMessages,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche de messages de l'utilisateur : ",
        error,
      );
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
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
        return res.status(404).json({
          success: false,
          message: "Aucun avis trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Avis de l'utlisateur trouvés avec succès",
        data: userReviews,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche d'avis de l'utilisateur : ",
        error,
      );
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  getSixRandomUsers: async (req: Request, res: Response) => {
    try {
      const sixRandomUsers = await User.findAll({
        order: Sequelize.literal("RANDOM()"),
        limit: 6,
        attributes: ["id", "firstname", "lastname", "profile_picture"],
      });

      if (!sixRandomUsers) {
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sx utilisateurs random trouvés",
        data: sixRandomUsers,
      });
    } catch (error) {
      console.error("Erreur dans la recherche d'utilisateurs random : ", error);
      return res.status(500).json({
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
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Six derniers utilisateurs trouvés",
        data: sixLatestUsers,
      });
    } catch (error) {
      console.error(
        "Erreur dans la recherche des 6 derniers utilisateurs : ",
        error,
      );
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
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
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur",
        });
      }

      return res.status(200).json({
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
    } catch (error) {
      console.error("Erreur dans la sélection de 10 utilisateurs : ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  getUsersBySkillAndZipcode: async (req: Request, res: Response) => {
    try {
      const { skillName, zipcode } = req.query;

      if (!skillName || !zipcode) {
        return res.status(400).json({
          success: false,
          message: "La compétence et le code postal sont requis.",
        });
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
        return res.status(404).json({
          success: false,
          message: "Aucun utilisateur trouvé dans votre filtre de recherche",
        });
      }
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Erreur dans la recherche : ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },
};

export default userController;
