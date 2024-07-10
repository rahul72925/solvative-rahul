import express from "express";
import { userRouter, pointsRouter } from "./entities/entities.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());
const apiRouter = express.Router();
const PORT = 4004;

apiRouter.use("/user", userRouter);
apiRouter.use("/points", pointsRouter);

app.use("/server/api", apiRouter);

app.listen(PORT, () => {
  console.log("server running on ", PORT);
});
