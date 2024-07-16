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
exports.CloudwatchPublisher = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("../logging/logger");
const client_cloudwatch_1 = require("@aws-sdk/client-cloudwatch");
const config_1 = require("@nestjs/config");
const cloudwatch_client_1 = require("./cloudwatch.client");
let CloudwatchPublisher = class CloudwatchPublisher {
    constructor(configService, cloudwatchClient) {
        this.configService = configService;
        this.cloudwatchClient = cloudwatchClient;
    }
    async publishMetric(name, value) {
        const namespace = this.configService.get("serviceName");
        const params = {
            Namespace: namespace,
            MetricData: [
                {
                    MetricName: name,
                    Dimensions: [
                        {
                            Name: "Environment",
                            Value: this.configService.get("environment"),
                        },
                    ],
                    Unit: "Count",
                    Value: value,
                },
            ],
        };
        const command = new client_cloudwatch_1.PutMetricDataCommand(params);
        try {
            await this.cloudwatchClient.clientInstance().send(command);
        }
        catch (error) {
            logger_1.logger.error(`Failed to publish metric ${namespace}/${name} `, error);
        }
    }
};
exports.CloudwatchPublisher = CloudwatchPublisher;
exports.CloudwatchPublisher = CloudwatchPublisher = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        cloudwatch_client_1.CloudwatchClient])
], CloudwatchPublisher);
//# sourceMappingURL=cloudwatch.publisher.js.map