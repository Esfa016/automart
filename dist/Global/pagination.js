"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationHelper = exports.PaginationDto = void 0;
const joi_typescript_validator_1 = require("joi-typescript-validator");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, joi_typescript_validator_1.Optional)(),
    (0, joi_typescript_validator_1.Min)(1)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, joi_typescript_validator_1.Optional)(),
    (0, joi_typescript_validator_1.Min)(1)
], PaginationDto.prototype, "limit", void 0);
class PaginationHelper {
    static paginateQuery(paginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;
        return skip;
    }
}
exports.PaginationHelper = PaginationHelper;
