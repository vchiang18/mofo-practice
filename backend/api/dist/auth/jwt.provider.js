"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const roles_1 = require("./rbac/roles");
class JwtProvider {
    async validateToken(token) {
        token;
        return {
            roles: [roles_1.Role.Admin],
        };
    }
}
exports.JwtProvider = JwtProvider;
//# sourceMappingURL=jwt.provider.js.map