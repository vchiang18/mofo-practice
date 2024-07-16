import { ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
export declare class HttpExceptionMappingFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
