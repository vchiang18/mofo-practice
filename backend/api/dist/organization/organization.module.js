"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const organization_controller_1 = require("./controller/organization.controller");
const organization_service_1 = require("./service/organization.service");
const config_1 = require("@nestjs/config");
const cloudwatch_module_1 = require("../metrics/cloudwatch.module");
const organization_instrumentation_1 = require("./observability/organization.instrumentation");
const cloudwatch_publisher_1 = require("../metrics/cloudwatch.publisher");
const logger_module_1 = require("../logging/logger.module");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudwatch_module_1.CloudwatchModule, logger_module_1.LoggerModule],
        controllers: [organization_controller_1.OrganizationController],
        providers: [
            organization_service_1.OrganizationService,
            config_1.ConfigService,
            organization_instrumentation_1.OrganizationInstrumentation,
            {
                provide: "OrganizationInstrumentation",
                useFactory: async (publisher) => {
                    return new organization_instrumentation_1.OrganizationInstrumentation(publisher);
                },
                inject: [cloudwatch_publisher_1.CloudwatchPublisher],
            },
        ],
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map