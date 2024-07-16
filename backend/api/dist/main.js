"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const logger_provider_1 = require("./logging/logger.provider");
const fs = require("fs");
const HttpExceptionMappingFilter_1 = require("./exceptions/HttpExceptionMappingFilter");
const CustomHttpExceptionMappingFilter_1 = require("./exceptions/CustomHttpExceptionMappingFilter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = await app.resolve(logger_provider_1.LoggerProvider);
    app.useGlobalFilters(new HttpExceptionMappingFilter_1.HttpExceptionMappingFilter(), new CustomHttpExceptionMappingFilter_1.CustomHttpExceptionMappingFilter());
    app.useLogger(logger);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("modern-football API documentation")
        .setDescription("")
        .setVersion("1.0")
        .addTag("modern-football")
        .addOAuth2({
        type: "oauth2",
        flows: {
            authorizationCode: {
                authorizationUrl: "",
                tokenUrl: "",
                scopes: {
                    email: "Email Scope",
                    profile: "Profile Scope",
                    openid: "OpenID Scope",
                },
            },
        },
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    if (process.env.GENERATE_SPEC) {
        fs.writeFileSync("./client/openapi/swagger.json", JSON.stringify(document));
        return;
    }
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map