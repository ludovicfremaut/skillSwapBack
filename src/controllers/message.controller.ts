import { Request, Response } from "express";
import Message from "../models/Message.model";
import { Op } from "sequelize";
import {QueryTypes} from "sequelize";

interface MessageController {
    getConversation(req: Request, res: Response): Promise<void>;
    createMessage(req: Request, res: Response): Promise<void>;
    getLatestMessagesForUser(req: Request, res: Response): Promise<void>;
} 

const messageController: MessageController = {

    getConversation: async (req: Request, res: Response) => {
        try {
            const { userId, contactId } = req.params;
            const authenticatedUserId = (req as any).user?.id; // ou req.user.id selon ton middleware

            // Vérifie que l'utilisateur connecté correspond à userId
            if (Number(userId) !== authenticatedUserId) {
            res.status(403).json({ message: "Accès interdit" });
            return;
            }

            // Validate parameters
            if (!userId || !contactId) {
                res.status(400).json({ message: 'User ID and Contact ID are required' });
                return;
            }

            // Fetch messages between the two users
            const messages = await Message.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: authenticatedUserId, receiver_id: contactId },
                        { sender_id: contactId, receiver_id: authenticatedUserId }
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
    },

    getLatestMessagesForUser: async (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.userId);

            const authenticatedUserId = (req as any).user?.id; // ou req.user.id selon ton middleware

            // Vérifie que l'utilisateur connecté correspond à userId
            if (Number(userId) !== authenticatedUserId) {
            res.status(403).json({ message: "Accès interdit" });
            return;
            }

            // Validate userId
            if (isNaN(userId) || !userId) {
                res.status(400).json({ message: 'User ID is required' });
                return
            }

            // Fetch the latest messages for the user
            const [results] = await Message.sequelize!.query(
                `
                SELECT DISTINCT ON (
                LEAST(sender_id, receiver_id),
                GREATEST(sender_id, receiver_id)
                ) *
                FROM message
                WHERE sender_id = :userId OR receiver_id = :userId
                ORDER BY
                LEAST(sender_id, receiver_id),
                GREATEST(sender_id, receiver_id),
                sending_date DESC
                `,
                {
                    replacements: { userId },
                    type: QueryTypes.SELECT
                }
            );

            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching latest messages:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } 
}
export default messageController;