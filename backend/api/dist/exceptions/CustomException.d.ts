import { HttpException } from "@nestjs/common";
export declare class CustomException extends HttpException {
    readonly message: string;
    readonly code: string;
    constructor(message: string, code: string, httpError: HttpException);
}
