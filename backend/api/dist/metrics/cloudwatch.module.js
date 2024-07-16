"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudwatchModule = void 0;
const common_1 = require("@nestjs/common");
const cloudwatch_publisher_1 = require("./cloudwatch.publisher");
const config_1 = require("@nestjs/config");
const cloudwatch_client_1 = require("./cloudwatch.client");
let CloudwatchModule = class CloudwatchModule {
};
exports.CloudwatchModule = CloudwatchModule;
exports.CloudwatchModule = CloudwatchModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [cloudwatch_publisher_1.CloudwatchPublisher, cloudwatch_client_1.CloudwatchClient, config_1.ConfigService],
        exports: [cloudwatch_publisher_1.CloudwatchPublisher],
    })
], CloudwatchModule);
//# sourceMappingURL=cloudwatch.module.js.map