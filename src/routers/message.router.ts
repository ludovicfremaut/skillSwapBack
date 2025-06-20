import { Router } from "express";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/last-conversations/:userId", messageController.getLatestMessagesForUser);
messageRouter.get("/:userId/:contactId", messageController.getConversation);
messageRouter.post("/:contactId", messageController.createMessage);

export default messageRouter;