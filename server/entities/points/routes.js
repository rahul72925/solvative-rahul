import express from "express";
import {
  deleteP5Points,
  getP5PointsHistory,
  getRewardPointsHistory,
  sendP5Points,
} from "./controllers.js";

const p5Router = express.Router();
const rewardRouter = express.Router();

p5Router.post("/send", sendP5Points);
p5Router.delete("/delete/:id", deleteP5Points);
p5Router.get("/", getP5PointsHistory);

rewardRouter.get("/", getRewardPointsHistory);

const pointsRouter = express.Router();

pointsRouter.use("/p5", p5Router);
pointsRouter.use("/reward", rewardRouter);

export { pointsRouter };
