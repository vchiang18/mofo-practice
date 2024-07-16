import { ConsoleLogger } from "@nestjs/common"

export class LoggerProviderFake extends ConsoleLogger {
	constructor() {
		super()
	}
	debug(message: any, context?: string) {
		context!
		console.log(message)
	}

	info(message: any, context?: string) {
		context!
		console.log(message)
	}

	warn(message: any, context?: string) {
		context!
		console.warn(message)
	}

	error(message: any, trace?: string, context?: string) {
		context!
		trace!
		console.error(message)
	}
}
