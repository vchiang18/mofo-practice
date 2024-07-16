"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpExceptionMappingFilter = void 0;
const common_1 = require("@nestjs/common");
const CustomException_1 = require("./CustomException");
let CustomHttpExceptionMappingFilter = class CustomHttpExceptionMappingFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const error = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            errorCode: exception.code,
            message: exception.message,
        };
        response.status(status).json(error);
    }
};
exports.CustomHttpExceptionMappingFilter = CustomHttpExceptionMappingFilter;
exports.CustomHttpExceptionMappingFilter = CustomHttpExceptionMappingFilter = __decorate([
    (0, common_1.Catch)(CustomException_1.CustomException)
], CustomHttpExceptionMappingFilter);
//# sourceMappingURL=CustomHttpExceptionMappingFilter.js.map