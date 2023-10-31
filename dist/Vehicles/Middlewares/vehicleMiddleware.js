"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicleMiddleware = void 0;
const joi_typescript_validator_1 = require("joi-typescript-validator");
const vehicleDto_1 = require("../Validations/vehicleDto");
function createVehicleMiddleware(request, response, next) {
    console.log('soime');
    const result = (0, joi_typescript_validator_1.Validate)(vehicleDto_1.CreateVehicleDTO, request.body);
    if (result.error)
        return response.status(400).json({ success: false, message: result.error.message });
    next();
}
exports.createVehicleMiddleware = createVehicleMiddleware;
