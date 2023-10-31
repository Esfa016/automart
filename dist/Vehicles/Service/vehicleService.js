"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const vehicleSchema_1 = require("../Model/vehicleSchema");
const services_1 = require("../../Global/services");
const pagination_1 = require("../../Global/pagination");
const messages_1 = require("../../Global/messages");
class VehicleService {
    static createVehicle(response, body, theFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = theFile.tempFilePath;
                const imageResult = yield services_1.uploader.uploader.upload(image, {
                    folder: "test",
                });
                const data = yield vehicleSchema_1.Vehicles.create(Object.assign({ image: imageResult.secure_url }, body));
                return response.status(201).json({ success: true, vehicle: data });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static getAllVehicles(response, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalData = yield vehicleSchema_1.Vehicles.countDocuments({});
                const data = yield vehicleSchema_1.Vehicles.find().skip(pagination_1.PaginationHelper.paginateQuery(pagination)).limit(pagination.limit);
                return response.status(200).json({ success: true, vehicles: data, totalData: totalData });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static updateVehicle(response, body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vehicleSchema_1.Vehicles.findByIdAndUpdate(id, body);
                return response.status(200).json({ success: true, vehicle: data });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static deleteVehicle(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield vehicleSchema_1.Vehicles.findByIdAndDelete(id);
                return response.status(200).json({ success: true, vehicle: data });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
}
exports.VehicleService = VehicleService;
