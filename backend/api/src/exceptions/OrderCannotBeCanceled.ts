import { UnprocessableEntityException } from "@nestjs/common"
import { CustomException } from "./CustomException"

export class OrderCannotBeCanceled extends CustomException {
	constructor() {
		super(
			"The order cannot be canceled as it has already been shipped",
			"ORDER_CANNOT_BE_CANCELED",
			new UnprocessableEntityException(),
		)
	}
}
