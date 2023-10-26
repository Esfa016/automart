import { Vehicles } from "../Model/vehicleSchema";
import { Request, Response } from "express";
import { CreateVehicleDTO } from "../Validations/vehicleDto";
export class VehicleService{
  static async createVehicle(response: Response, body: CreateVehicleDTO) {
        try { 
            const data = await Vehicles.create(body)
            return response.status(201).json({
                success: true,
                vehicle:data
            })
        }
        catch (error) {
            throw error
        }
    }
}