"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const vehicleSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users" },
    model: { type: String, required: false },
    image: { type: String, required: false },
});
exports.Vehicles = mongoose_1.default.model("Vehicles", vehicleSchema);
