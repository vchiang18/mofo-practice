import { HttpException } from "@nestjs/common"

export class CustomException extends HttpException {
	public readonly message: string
	public readonly code: string

	constructor(message: string, code: string, httpError: HttpException) {
		super(httpError.getResponse(), httpError.getStatus())
		this.message = message
		this.code = code
	}
}
