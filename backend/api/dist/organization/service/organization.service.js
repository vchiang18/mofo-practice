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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const organization_model_1 = require("../model/organization.model");
const config_1 = require("@nestjs/config");
const organization_instrumentation_1 = require("../observability/organization.instrumentation");
const logger_provider_1 = require("../../logging/logger.provider");
let OrganizationService = class OrganizationService {
    constructor(configService, organizationInstrumentation, logger) {
        this.configService = configService;
        this.organizationInstrumentation = organizationInstrumentation;
        this.logger = logger;
    }
    updateOrganization(id, name) {
        return new organization_model_1.default(id, name);
    }
    createOrganization(name) {
        try {
            this.organizationInstrumentation.organizationCreateSucceeded();
            return new organization_model_1.default("2", name);
        }
        catch (error) {
            this.organizationInstrumentation.organizationCreateFailed();
            throw error;
        }
    }
    getOrganizations() {
        this.logger.debug(this.configService.get("environment"));
        return [
            {
                id: "1",
                name: "Starter Kit Organization",
            },
        ];
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        organization_instrumentation_1.OrganizationInstrumentation,
        logger_provider_1.LoggerProvider])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map