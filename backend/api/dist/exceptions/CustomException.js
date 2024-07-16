"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(message, code, httpError) {
        super(httpError.getResponse(), httpError.getStatus());
        this.message = message;
        this.code = code;
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=CustomException.js.map