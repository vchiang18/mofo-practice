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
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const organization_model_1 = require("../model/organization.model");
const organization_service_1 = require("../service/organization.service");
const organization_dto_1 = require("../model/organization.dto");
const roles_decorator_1 = require("../../auth/rbac/roles.decorator");
const roles_1 = require("../../auth/rbac/roles");
const logger_provider_1 = require("../../logging/logger.provider");
const swagger_1 = require("@nestjs/swagger");
let OrganizationController = class OrganizationController {
    constructor(orgService, logger) {
        this.orgService = orgService;
        this.logger = logger;
    }
    createOrganization(createRequest) {
        return this.orgService.createOrganization(createRequest.name);
    }
    updateOrganization(id, createRequest) {
        return this.orgService.updateOrganization(id, createRequest.name);
    }
    getOrganizations(name) {
        name && this.logger.info(`Getting organizations with name ${name}`);
        this.logger.info("Getting organizations");
        return this.orgService.getOrganizations();
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_1.Role.Admin),
    (0, swagger_1.ApiResponse)({
        type: organization_model_1.default,
        status: 201,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.CreateOrganizationDTO]),
    __metadata("design:returntype", organization_model_1.default)
], OrganizationController.prototype, "createOrganization", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiResponse)({
        type: organization_model_1.default,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, organization_dto_1.CreateOrganizationDTO]),
    __metadata("design:returntype", organization_model_1.default)
], OrganizationController.prototype, "updateOrganization", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: organization_model_1.default,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], OrganizationController.prototype, "getOrganizations", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)("organizations"),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Unauthorized",
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: "Forbidden",
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "Internal Server Error",
    }),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService,
        logger_provider_1.LoggerProvider])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map