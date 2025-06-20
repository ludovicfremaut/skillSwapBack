import { Request, Response } from "express";
import { Skill } from "../models/associations";

interface SkillController {
  getAllSkills(req: Request, res: Response): Promise<void>;
}

const skillController: SkillController = {
  getAllSkills: async (req: Request, res: Response) => {
    try {
      const skills = await Skill.findAll({
        attributes: ["id", "name"],
        order: [["name", "ASC"]],
      });
      res.status(200).json(skills);
      return;
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  },
};

export default skillController;
