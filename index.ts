import "dotenv/config";
import express from "express";
import authRouter from "./src/routers/auth.router";
import userRouter from "./src/routers/user.router";
import skillRouter from "./src/routers/skill.router";

import cors from "cors"; 
import messageRouter from "./src/routers/message.router";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/skills", skillRouter);
app.use("/api/messages", messageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
