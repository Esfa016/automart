import { Request, Response, NextFunction } from "express";
import {Validate} from 'joi-typescript-validator'
import { CreateVehicleDTO } from "../Validations/vehicleDto";
export function createVehicleMiddleware(request: Request, response: Response, next: NextFunction) {
    console.log('soime')
    const result = Validate(CreateVehicleDTO, request.body)
    if (result.error) return response.status(400).json({ success: false, message: result.error.message })
    next()
    
}