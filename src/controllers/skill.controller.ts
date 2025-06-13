import { Request, Response } from 'express';
import { Skill } from '../models/associations';
import { Sequelize } from 'sequelize';

interface SkillController {
  getAllSkills(req: Request, res: Response) : Promise<Response>;
}


const skillController: SkillController = {

    getAllSkills: async (req: Request, res: Response) => {
        try {
            const skills = await Skill.findAll({
                attributes: ['id', 'name'],
                order: [['name', 'ASC']]
            });
            return res.status(200).json(skills);
        } catch (error) {
            console.error('Error fetching skills:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

    export default skillController;