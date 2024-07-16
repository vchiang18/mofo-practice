import { CanActivate, Injectable } from "@nestjs/common"

@Injectable()
export class AuthGuardFake implements CanActivate {
	constructor() {}

	// async canActivate(context: ExecutionContext): Promise<boolean> {
	async canActivate(): Promise<boolean> {
		console.log("Fake auth guard was called")
		return true
	}
}
