import { Request, Response, Router } from "express";
import { VehicleService } from "../Service/vehicleService";
import { createVehicleMiddleware } from "../Middlewares/vehicleMiddleware";
import { authentication } from "../../Users/Middlewares/userMiddleware";
import { JwtPayload } from "jsonwebtoken";
import { UserType } from "../../Global/types";
const router =Router()


router.post('/', authentication, createVehicleMiddleware, (request: Request, response: Response) => {
    request.body.createdBy = request.user
    VehicleService.createVehicle(response, request.body)
})

export { router as vehicleRouter}