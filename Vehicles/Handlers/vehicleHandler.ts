import { Request, Response, Router } from "express";
import { VehicleService } from "../Service/vehicleService";
import { createVehicleMiddleware } from "../Middlewares/vehicleMiddleware";
import { authentication } from "../../Users/Middlewares/userMiddleware";
import { JwtPayload } from "jsonwebtoken";
import { UserType } from "../../Global/types";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import { Vehicles } from "../Model/vehicleSchema";
import mongoose from "mongoose";
const router =Router()


router
  .post(
    "/",
    authentication,
    createVehicleMiddleware,
    (request: Request, response: Response) => {
      request.body.createdBy = request.user;
      const upladed: UploadedFile | UploadedFile[] = request.files!.image;
      VehicleService.createVehicle(
        response,
        request.body,
        upladed as UploadedFile
      );
    }
  )
  .get("/", (request: Request, response: Response) => {
    const paginateDto = {
      page: parseInt(request.query.page?.toString()!),
      limit: parseFloat(request.query.limit?.toString()!),
    };
    VehicleService.getAllVehicles(response, paginateDto);
  })
  .put("/:id", (request: Request, response: Response) => {
    VehicleService.updateVehicle(
      response,
      request.body,
      new mongoose.Types.ObjectId(request.params.id)
    );
  })
  .delete("/:id", (request: Request, response: Response) => {
    VehicleService.deleteVehicle(
      response,
      new mongoose.Types.ObjectId(request.params.id)
    );
  });

export { router as vehicleRouter}