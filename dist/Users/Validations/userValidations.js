"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateDto = exports.LoginUserDto = exports.CreateUserDto = void 0;
const joi_typescript_validator_1 = require("joi-typescript-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, joi_typescript_validator_1.Required)()
], CreateUserDto.prototype, "fullName", void 0);
__decorate([
    (0, joi_typescript_validator_1.Email)()
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, joi_typescript_validator_1.Email)()
], CreateUserDto.prototype, "password", void 0);
class LoginUserDto {
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, joi_typescript_validator_1.Required)()
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, joi_typescript_validator_1.Required)()
], LoginUserDto.prototype, "password", void 0);
class UserUpdateDto {
}
exports.UserUpdateDto = UserUpdateDto;
__decorate([
    (0, joi_typescript_validator_1.Optional)()
], UserUpdateDto.prototype, "fullName", void 0);
__decorate([
    (0, joi_typescript_validator_1.Optional)()
], UserUpdateDto.prototype, "email", void 0);
__decorate([
    (0, joi_typescript_validator_1.Optional)()
], UserUpdateDto.prototype, "password", void 0);
