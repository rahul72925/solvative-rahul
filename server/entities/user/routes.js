import express from "express";
import { createUser, loginUser, updateUser } from "./controllers.js";

const userRouter = express.Router();

userRouter.post("/update", updateUser);
userRouter.post("/login", loginUser);

export { userRouter };
