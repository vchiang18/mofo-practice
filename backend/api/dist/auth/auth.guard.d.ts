import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtProvider } from "./jwt.provider";
export declare class AuthGuard implements CanActivate {
    private readonly jwtProvider;
    constructor(jwtProvider: JwtProvider);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
