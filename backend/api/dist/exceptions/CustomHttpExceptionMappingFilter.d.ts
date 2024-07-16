import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { CustomException } from "./CustomException";
export declare class CustomHttpExceptionMappingFilter implements ExceptionFilter {
    catch(exception: CustomException, host: ArgumentsHost): void;
}
