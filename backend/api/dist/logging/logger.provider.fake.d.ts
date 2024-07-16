import { ConsoleLogger } from "@nestjs/common";
export declare class LoggerProviderFake extends ConsoleLogger {
    constructor();
    debug(message: any, context?: string): void;
    info(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
}
