import { BadRequestException, Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"
import { OrderCannotBeCanceled } from "./exceptions/OrderCannotBeCanceled"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}
	@Get("/exception")
	throwException(): string {
		throw new BadRequestException("This is a test exception")
	}
	@Get("/exception/unprocessable")
	throwUnprocessableEntity(): string {
		throw new OrderCannotBeCanceled()
	}
}
