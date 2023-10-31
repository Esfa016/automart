"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conString = process.env.DB_CONN;
function connectMongoDb() {
    mongoose_1.default
        .connect(conString)
        .then(() => console.log("Server up and running"))
        .catch((error) => console.error(error));
}
exports.connectMongoDb = connectMongoDb;
