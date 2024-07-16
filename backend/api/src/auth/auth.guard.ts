import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"
import { JwtProvider } from "./jwt.provider"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtProvider: JwtProvider) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		console.log(context)
		// const request = context.switchToHttp().getRequest();
		// const token = this.extractTokenFromHeader(request);
		// if (!token) {
		//   throw new UnauthorizedException();
		// } else {
		//   try {
		//     const user = await this.jwtProvider.validateToken(token);
		//     request.user = user;
		//   } catch {
		//     throw new UnauthorizedException();
		//   }
		// }
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? []
		return type === "Bearer" ? token : undefined
	}
}
