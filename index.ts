import "dotenv/config";
import express from "express";
import authRouter from "./src/routers/auth.router";
import userRouter from "./src/routers/user.router";
import skillRouter from "./src/routers/skill.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import serviceRouter from "./src/routers/service.router";
import messageRouter from "./src/routers/message.router";
import { verifyToken } from "./src/middleware/auth.middleware";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/skills", skillRouter);

app.use("/api/services", verifyToken, serviceRouter);
app.use("/api/messages", verifyToken, messageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
