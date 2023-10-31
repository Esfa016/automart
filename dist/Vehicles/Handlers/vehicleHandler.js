"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicleService_1 = require("../Service/vehicleService");
const vehicleMiddleware_1 = require("../Middlewares/vehicleMiddleware");
const userMiddleware_1 = require("../../Users/Middlewares/userMiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
exports.vehicleRouter = router;
router
    .post("/", userMiddleware_1.authentication, vehicleMiddleware_1.createVehicleMiddleware, (request, response) => {
    request.body.createdBy = request.user;
    const upladed = request.files.image;
    vehicleService_1.VehicleService.createVehicle(response, request.body, upladed);
})
    .get("/", (request, response) => {
    var _a, _b;
    const paginateDto = {
        page: parseInt((_a = request.query.page) === null || _a === void 0 ? void 0 : _a.toString()),
        limit: parseFloat((_b = request.query.limit) === null || _b === void 0 ? void 0 : _b.toString()),
    };
    vehicleService_1.VehicleService.getAllVehicles(response, paginateDto);
})
    .put("/:id", (request, response) => {
    vehicleService_1.VehicleService.updateVehicle(response, request.body, new mongoose_1.default.Types.ObjectId(request.params.id));
})
    .delete("/:id", (request, response) => {
    vehicleService_1.VehicleService.deleteVehicle(response, new mongoose_1.default.Types.ObjectId(request.params.id));
});
