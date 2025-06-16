import { Request, Response } from "express";
import Message from "../models/Message.model";
import { Op } from "sequelize";

interface MessageController {
    getConversation(req: Request, res: Response): Promise<void>;
} 

const messageController: MessageController = {

    getConversation: async (req: Request, res: Response) => {
        try {
            const { userId, contactId } = req.params;

            // Validate parameters
            if (!userId || !contactId) {
                res.status(400).json({ message: 'User ID and Contact ID are required' });
                return;
            }

            // Fetch messages between the two users
            const messages = await Message.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: userId, receiver_id: contactId },
                        { sender_id: contactId, receiver_id: userId }
                    ]
                },
                order: [['createdAt', 'ASC']]
            });

            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching conversation:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
export default messageController;