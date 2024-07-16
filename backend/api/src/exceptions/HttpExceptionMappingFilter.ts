import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from "@nestjs/common"
import { Response } from "express"
import { CustomErrorResponse } from "./CustomErrorResponse"

@Catch(HttpException)
export class HttpExceptionMappingFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		const status = exception.getStatus()

		const error: CustomErrorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			errorCode: exception.name,
			message: exception.message,
		}
		response.status(status).json(error)
	}
}
