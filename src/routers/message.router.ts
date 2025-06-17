import { Router } from "express";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/:userId/:contactId", messageController.getConversation);
messageRouter.post("/", messageController.createMessage);

export default messageRouter;