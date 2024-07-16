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
exports.OrganizationInstrumentation = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../../logging/logger");
const cloudwatch_publisher_1 = require("../../metrics/cloudwatch.publisher");
let OrganizationInstrumentation = class OrganizationInstrumentation {
    constructor(cloudwatchPublisher) {
        this.cloudwatchPublisher = cloudwatchPublisher;
    }
    async organizationCreateSucceeded() {
        logger_1.logger.info("Organization created successfully");
        await this.cloudwatchPublisher.publishMetric("OrganizationCreateSucceeded", 1);
    }
    async organizationCreateFailed() {
        logger_1.logger.error("Organization creation failed");
        await this.cloudwatchPublisher.publishMetric("OrganizationCreateFailed", 1);
    }
};
exports.OrganizationInstrumentation = OrganizationInstrumentation;
exports.OrganizationInstrumentation = OrganizationInstrumentation = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudwatch_publisher_1.CloudwatchPublisher])
], OrganizationInstrumentation);
//# sourceMappingURL=organization.instrumentation.js.map