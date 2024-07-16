"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCannotBeCanceled = void 0;
const common_1 = require("@nestjs/common");
const CustomException_1 = require("./CustomException");
class OrderCannotBeCanceled extends CustomException_1.CustomException {
    constructor() {
        super("The order cannot be canceled as it has already been shipped", "ORDER_CANNOT_BE_CANCELED", new common_1.UnprocessableEntityException());
    }
}
exports.OrderCannotBeCanceled = OrderCannotBeCanceled;
//# sourceMappingURL=OrderCannotBeCanceled.js.map