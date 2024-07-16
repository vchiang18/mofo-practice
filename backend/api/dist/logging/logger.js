"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
const loggingFormat = () => {
    if (process.env.LOG_FORMAT === "simple") {
        console.warn("Using simple logging format, this is not recommended for production");
        return winston.format.combine(winston.format.timestamp(), winston.format.simple());
    }
    else {
        return winston.format.combine(winston.format.timestamp(), winston.format.json());
    }
};
exports.logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: loggingFormat(),
        }),
    ],
});
//# sourceMappingURL=logger.js.map