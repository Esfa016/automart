import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { vehicleRouter } from "./Vehicles/Handlers/vehicleHandler";
import { connectMongoDb } from "./Config/Database/database";
import { userRouter } from "./Users/Handlers/userHandler";
import * as uploader from "express-fileupload";
import * as cors from 'cors'
const app = express();
const port = process.env.PORT || 8080;
app.use(cors.default())
app.use(express.json({}));
app.use(
  uploader.default({
    limits: { fileSize: 10000000, files: 1 },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "tmp",
  })
);
app.use("/vehicle", vehicleRouter);
app.use("/user", userRouter);
app.listen(port, () => {

  connectMongoDb();
});
