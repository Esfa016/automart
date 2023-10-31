"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userServices_1 = require("../Services/userServices");
const userMiddleware_1 = require("../Middlewares/userMiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
exports.userRouter = router;
router
    .post("/", userMiddleware_1.createUserMiddleware, (request, response) => {
    userServices_1.UserService.createUser(response, request.body);
})
    .get("/", (request, response) => {
    var _a, _b;
    const paginate = {
        page: parseInt((_a = request.query.page) === null || _a === void 0 ? void 0 : _a.toString()),
        limit: parseFloat((_b = request.query.limit) === null || _b === void 0 ? void 0 : _b.toString()),
    };
    userServices_1.UserService.getAllUsers(response, paginate);
})
    .get("/:id", (request, response) => {
    userServices_1.UserService.getOneUser(response, new mongoose_1.default.Types.ObjectId(request.params.id));
})
    .put("/:id", (request, response) => {
    userServices_1.UserService.updateUser(response, new mongoose_1.default.Types.ObjectId(request.params.id), request.body);
})
    .delete("/:id", (request, response) => {
    userServices_1.UserService.deleteUser(response, new mongoose_1.default.Types.ObjectId(request.params.id));
})
    .post("/login", userMiddleware_1.loginUserMiddleware, (request, response) => userServices_1.UserService.loginUser(response, request.body));
