import { Request, Response } from "express";
import Message from "../models/Message.model";
import { Op } from "sequelize";

interface MessageController {
    getConversation(req: Request, res: Response): Promise<void>;
    createMessage(req: Request, res: Response): Promise<void>;
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
                order: [['sending_date', 'ASC']]
            });

            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching conversation:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createMessage: async (req: Request, res: Response) => {
        try {
            const { sender_id, receiver_id, body } = req.body;

            // Validate request body
            if (!sender_id || !receiver_id || !body) {
                res.status(400).json({ message: 'Sender ID, Receiver ID, and content are required' });
                return;
            }

            // Create a new message
            const newMessage = await Message.create({
                sender_id,
                receiver_id,
                body,
                sending_date: new Date()
            });

            res.status(201).json(newMessage);
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
export default messageController;