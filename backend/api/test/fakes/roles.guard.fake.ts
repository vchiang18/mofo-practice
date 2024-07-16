import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

@Injectable()
export class RolesGuardFake implements CanActivate {
	constructor(private reflector: Reflector) {
		console.log(reflector)
	}

	canActivate(context: ExecutionContext): boolean {
		console.log(context)
		return true
	}
}
