import { Vehicles } from "../Model/vehicleSchema";
import { Request, Response, response } from "express";
import { CreateVehicleDTO, UpdateehicleDTO } from "../Validations/vehicleDto";
import { uploader } from "../../Global/services";
import fileUpload, { FileArray, UploadedFile } from "express-fileupload";
import { PaginationDto, PaginationHelper } from "../../Global/pagination";
import { ErrorMessages } from "../../Global/messages";
import mongoose from "mongoose";
export class VehicleService {
  static async createVehicle(
    response: Response,
    body: CreateVehicleDTO,
    theFile: UploadedFile
  ) {
    try {
      const image = theFile.tempFilePath;
      const imageResult = await uploader.uploader.upload(image, {
        folder: "test",
      });
      const data = await Vehicles.create({
        image: imageResult.secure_url,
        ...body,
      });
      return response.status(201).json({ success: true, vehicle: data });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ success: false, message: ErrorMessages.serverError });
    }
    }
    
    static async getAllVehicles(response: Response, pagination: PaginationDto) {
        try { 
            const totalData = await Vehicles.countDocuments({})
            const data = await Vehicles.find().skip(PaginationHelper.paginateQuery(pagination)).limit(pagination.limit)
            return response.status(200).json({success:true,vehicles:data, totalData:totalData})
        }
        catch (error) {
              console.error(error);
              return response
                .status(500)
                .json({ success: false, message: ErrorMessages.serverError });
        }
    }

    static async updateVehicle(response: Response, body: UpdateehicleDTO, id:mongoose.Types.ObjectId) {
        try { 
            const data = await Vehicles.findByIdAndUpdate(id, body)
            return response.status(200).json({success:true,vehicle:data})
        }
        catch (error) {
             console.error(error);
             return response
               .status(500)
               .json({ success: false, message: ErrorMessages.serverError });
        }
    }

    static async deleteVehicle(response: Response, id: mongoose.Types.ObjectId) {
        try { 
          const data=  await Vehicles.findByIdAndDelete(id)
            return response.status(200).json({success:true,vehicle:data})
        }
        catch (error) {
            console.error(error);
            return response
              .status(500)
              .json({ success: false, message: ErrorMessages.serverError });
        }
    }
}
