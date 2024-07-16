"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./rbac/roles.guard");
const jwt_provider_1 = require("./jwt.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [
            auth_guard_1.AuthGuard,
            roles_guard_1.RolesGuard,
            jwt_provider_1.JwtProvider,
            {
                provide: core_1.APP_GUARD,
                useExisting: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useExisting: roles_guard_1.RolesGuard,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map