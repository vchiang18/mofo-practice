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
const swagger_1 = require("@nestjs/swagger");
class Organization {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.default = Organization;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "d2f9d636-dc14-4389-a494-93ad462cf44e",
        description: "Id of the organization (uuid)",
    }),
    __metadata("design:type", String)
], Organization.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Organization ABC",
        description: "Name of the organization",
    }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
//# sourceMappingURL=organization.model.js.map