import { Role } from "./rbac/roles";
export interface User {
    roles: Role[];
}
export declare class JwtProvider {
    validateToken(token: string): Promise<User>;
}
