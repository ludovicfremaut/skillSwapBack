import { Router } from "express";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/", messageController.getAllMessages);

export default messageRouter;