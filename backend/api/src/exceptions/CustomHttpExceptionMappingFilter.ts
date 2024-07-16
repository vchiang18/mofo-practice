import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common"
import { Response } from "express"
import { CustomErrorResponse } from "./CustomErrorResponse"
import { CustomException } from "./CustomException"

@Catch(CustomException)
export class CustomHttpExceptionMappingFilter implements ExceptionFilter {
	catch(exception: CustomException, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		const status = exception.getStatus()

		const error: CustomErrorResponse = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			errorCode: exception.code,
			message: exception.message,
		}

		response.status(status).json(error)
	}
}
