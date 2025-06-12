import "dotenv/config";
import express from "express";
import authRouter from "./src/routers/auth.router";
import userRouter from "./src/routers/user.router";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
