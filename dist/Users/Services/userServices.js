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
exports.UserService = void 0;
const messages_1 = require("../../Global/messages");
const userSchema_1 = require("../Models/userSchema");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const pagination_1 = require("../../Global/pagination");
class UserService {
    static createUser(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userSchema_1.Users.create(body);
                return response
                    .status(201)
                    .json({ success: true, message: messages_1.SuccessMessages.saved });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static loginUser(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield userSchema_1.Users.findOne({ email: body.email });
                if (!userFound)
                    return response
                        .status(401)
                        .json({ success: false, message: messages_1.ErrorMessages.invalidCredentials });
                const passMatch = yield (0, bcrypt_1.compare)(body.password, userFound.password);
                if (!passMatch)
                    return response.status(401).json({
                        success: false,
                        message: messages_1.ErrorMessages.invalidCredentials,
                    });
                const accessToken = (0, jsonwebtoken_1.sign)({ id: userFound._id }, process.env.JWT);
                return response
                    .status(200)
                    .json({ success: true, accessToken: accessToken });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static getAllUsers(response, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalData = yield userSchema_1.Users.countDocuments();
                const data = yield userSchema_1.Users.find({}, { password: 0 })
                    .skip(pagination_1.PaginationHelper.paginateQuery(pagination))
                    .limit(pagination.limit);
                return response.status(200).json({ success: true, users: data, totalData: totalData });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static getOneUser(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userSchema_1.Users.findById(id, { password: 0 });
                return response.status(200).json({ success: true, user: data });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static updateUser(response, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userSchema_1.Users.findByIdAndUpdate(id, body);
                if (!data)
                    return response
                        .status(404)
                        .json({ success: false, message: messages_1.ErrorMessages.notFound });
                return response
                    .status(200)
                    .json({ success: true, message: messages_1.SuccessMessages.updated });
            }
            catch (error) {
                console.error(error);
                return response
                    .status(500)
                    .json({ success: false, message: messages_1.ErrorMessages.serverError });
            }
        });
    }
    static deleteUser(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield userSchema_1.Users.findByIdAndDelete(id);
                if (!data)
                    return response
                        .status(404)
                        .json({ success: false, message: messages_1.ErrorMessages.notFound });
                return response
                    .status(200)
                    .json({ success: true, message: messages_1.SuccessMessages.deleted });
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
exports.UserService = UserService;
