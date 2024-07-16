"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("./logger");
const core_1 = require("@nestjs/core");
const uuid_1 = require("uuid");
let LoggerProvider = class LoggerProvider extends common_1.ConsoleLogger {
    constructor(request) {
        super();
        this.request = request;
        const correlationId = this.getOrGenerateCorrelationId(request);
        this._logger = logger_1.logger.child({ correlationId });
    }
    getOrGenerateCorrelationId(request) {
        let correlationId = "";
        if (request) {
            correlationId = request.headers["x-correlation-id"];
        }
        else {
            correlationId = (0, uuid_1.v4)();
        }
        return correlationId;
    }
    debug(message, context) {
        this._logger.debug(message, context);
    }
    info(message, context) {
        this._logger.info(message, context);
    }
    warn(message, context) {
        this._logger.warn(message, context);
    }
    error(message, trace, context) {
        this._logger.error(message, trace, context);
    }
};
exports.LoggerProvider = LoggerProvider;
exports.LoggerProvider = LoggerProvider = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object])
], LoggerProvider);
//# sourceMappingURL=logger.provider.js.map