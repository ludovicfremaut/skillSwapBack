import { Request, RequestHandler, Response } from "express";
import { User } from "../models/associations";

interface UserController {
  getAllUsers: (req: Request, res: Response) => Promise<Response>;
  getOneUser: (req: Request, res: Response) => Promise<Response>;
  deleteUser: (req: Request, res: Response) => Promise<Response>;
  updateUser: (req: Request, res: Response) => Promise<Response>;
  getUserServices: (req: Request, res: Response) => Promise<Response>;
  getUserMessages: (req: Request, res: Response) => Promise<Response>;
}

const userController: UserController = {
  getAllUsers: async (req: Request, res: Response): Promise<Response> => {
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
        date: users,
      });
    } catch (error) {
      console.error("error in getAllUsers : ", error);
      return res.status(500).json({
        success: false,
        message: "internal server error",
      });
    }
  },

  getOneUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      // Use where with findOne to check by id
      const user = await User.findByPk(req.params.id, {
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
          {
            association: "sender",
            attributes: ["firstname"],
          },
          {
            association: "receiver",
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
        date: user,
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
        message: "Services de l'utlisateur trouvés avec succès",
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
      try {
        const userMessages = await User.findByPk(req.params.id, {
          include: [
            {
              association: "sentMessages",
              attributes: ["body", "sending_at", "updated_at"],
            },
            {
              association: "receivedMessages",
              attributes: ["body", "sending_at", "updated_at"],
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
};

export default userController;
