import { Request, Response } from "express";
import { User } from "../models/associations";

const userController = {
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

      if (!users) {
        return res.status(400).json({ message: "Aucun user" });
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },

  getOneUser: async (req: Request, res: Response) => {
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
        return res.status(400).json({ message: "Aucun user" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  },
};

export default userController;
