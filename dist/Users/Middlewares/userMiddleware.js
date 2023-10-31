"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.loginUserMiddleware = exports.createUserMiddleware = void 0;
const joi_typescript_validator_1 = require("joi-typescript-validator");
const userValidations_1 = require("../Validations/userValidations");
const messages_1 = require("../../Global/messages");
const jsonwebtoken_1 = require("jsonwebtoken");
function createUserMiddleware(request, response, next) {
    const result = (0, joi_typescript_validator_1.Validate)(userValidations_1.CreateUserDto, request.body);
    if (result.error)
        return response
            .status(400)
            .json({ success: false, message: result.error.message });
    next();
}
exports.createUserMiddleware = createUserMiddleware;
function loginUserMiddleware(request, response, next) {
    const result = (0, joi_typescript_validator_1.Validate)(userValidations_1.LoginUserDto, request.body);
    if (result.error)
        return response
            .status(400)
            .json({ success: false, message: result.error.message });
    next();
}
exports.loginUserMiddleware = loginUserMiddleware;
function authentication(request, response, next) {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return response
            .status(401)
            .json({ success: false, message: messages_1.ErrorMessages.unAuthorized });
    (0, jsonwebtoken_1.verify)(token, process.env.JWT, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError")
                return response
                    .status(403)
                    .json({ success: false, message: messages_1.ErrorMessages.sessionTimeOur });
        }
        request.user = user.id;
        next();
    });
}
exports.authentication = authentication;
