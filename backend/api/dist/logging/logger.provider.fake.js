"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProviderFake = void 0;
const common_1 = require("@nestjs/common");
class LoggerProviderFake extends common_1.ConsoleLogger {
    constructor() {
        super();
    }
    debug(message, context) {
        context;
        console.log(message);
    }
    info(message, context) {
        context;
        console.log(message);
    }
    warn(message, context) {
        context;
        console.warn(message);
    }
    error(message, trace, context) {
        context;
        trace;
        console.error(message);
    }
}
exports.LoggerProviderFake = LoggerProviderFake;
//# sourceMappingURL=logger.provider.fake.js.map