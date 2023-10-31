"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const vehicleHandler_1 = require("./Vehicles/Handlers/vehicleHandler");
const database_1 = require("./Config/Database/database");
const userHandler_1 = require("./Users/Handlers/userHandler");
const uploader = __importStar(require("express-fileupload"));
const cors = __importStar(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(cors.default());
app.use(express_1.default.json({}));
app.use(uploader.default({
    limits: { fileSize: 10000000, files: 1 },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "tmp",
}));
app.use("/vehicle", vehicleHandler_1.vehicleRouter);
app.use("/user", userHandler_1.userRouter);
app.listen(port, () => {
    (0, database_1.connectMongoDb)();
});
