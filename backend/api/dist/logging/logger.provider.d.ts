import { ConsoleLogger } from "@nestjs/common";
import { Request } from "express";
export declare class LoggerProvider extends ConsoleLogger {
    private request?;
    private readonly _logger;
    constructor(request?: Request);
    private getOrGenerateCorrelationId;
    debug(message: any, context?: string): void;
    info(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
}
